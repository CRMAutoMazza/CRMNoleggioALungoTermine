const https = require('https');
const http = require('http');

const WP_AUTH = Buffer.from('CRM:oFLi 6VNh KvcG RRk9 UZmo QfhN').toString('base64');

// --- HELPERS ---

function wpRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.automazza.it',
            path: path,
            method: method,
            headers: {
                'Authorization': `Basic ${WP_AUTH}`,
                'Content-Type': 'application/json'
            }
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ status: res.statusCode, data: data ? JSON.parse(data) : {} }));
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function crmRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve({ status: res.statusCode, data: data ? JSON.parse(data) : {} }));
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function runBatch() {
    console.log(`--- BATCH TEST: 10 LEADS ---`);

    // 1. CREATE 10 LEADS
    console.log('1. Creating 10 Leads on WordPress...');
    const wpIds = [];

    for (let i = 1; i <= 10; i++) {
        const name = `BATCH_TEST_USER_${i}_${Date.now()}`;
        const res = await wpRequest('POST', '/wp-json/wp/v2/auto_lead', {
            title: name,
            status: 'publish',
            lead_data: { name: name, email: `batch${i}@test.com` }
        });
        if (res.status === 201) {
            console.log(`   [${i}/10] Created WP ID: ${res.data.id}`);
            wpIds.push(res.data.id);
        } else {
            console.error(`   [${i}/10] FAILED:`, res.data);
        }
    }

    if (wpIds.length === 0) return;

    // 2. TRIGGER SYNC
    console.log('\n2. Triggering CRM Sync...');
    await crmRequest('POST', '/leads/sync');
    console.log('   Waiting 30s for sync processing...');
    await new Promise(r => setTimeout(r, 30000));

    // 3. FIND IN CRM
    console.log('\n3. Verifying presence in CRM...');
    const allLeads = await crmRequest('GET', '/leads');
    let foundCount = 0;
    const crmIdsMap = {}; // Map WP_ID -> CRM_ID

    for (const wpId of wpIds) {
        // Strict match on nested correct path
        const match = allLeads.data.find(l => {
            if (!l.data) return false;
            const innerId = l.data.wp_id || (l.data.data && l.data.data.wp_id);
            return innerId == wpId;
        });

        if (match) {
            foundCount++;
            crmIdsMap[wpId] = match.id;
        }
    }

    console.log(`   Found ${foundCount}/${wpIds.length} leads in CRM.`);

    // 4. DELETE FROM CRM
    if (foundCount > 0) {
        console.log('\n4. Deleting found leads from CRM...');
        for (const wpId of Object.keys(crmIdsMap)) {
            const crmId = crmIdsMap[wpId];
            process.stdout.write(`   Deleting CRM ID ${crmId} (WP ${wpId})... `);
            const del = await crmRequest('DELETE', `/leads/${crmId}`);
            if (del.status < 300) process.stdout.write('OK\n');
            else process.stdout.write('FAIL\n');
        }

        // 5. VERIFY GONE FROM WP
        console.log('\n5. Verifying removal from WordPress...');
        let goneCount = 0;
        for (const wpId of wpIds) {
            const check = await wpRequest('GET', `/wp-json/wp/v2/auto_lead/${wpId}`);
            if (check.status === 404 || check.status === 410) {
                goneCount++;
            } else {
                console.log(`   WARNING: WP ID ${wpId} still exists (Status ${check.status})`);
            }
        }
        console.log(`   Confirmed ${goneCount}/${wpIds.length} deleted from WordPress.`);
    }
}

runBatch();
