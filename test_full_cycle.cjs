const https = require('https');
const http = require('http');

const WP_AUTH = Buffer.from('CRM:oFLi 6VNh KvcG RRk9 UZmo QfhN').toString('base64');
const TIMESTAMP = Date.now();
const LEAD_NAME = `AUTO_DELETE_${TIMESTAMP}`;

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

async function run() {
    console.log(`--- FULL CYCLE TEST: ${LEAD_NAME} ---`);

    // 1. CREATE ON WP
    console.log('1. Creating Lead on WordPress...');
    const wpCreate = await wpRequest('POST', '/wp-json/wp/v2/auto_lead', {
        title: LEAD_NAME,
        status: 'publish',
        lead_data: { name: LEAD_NAME, email: `test_${TIMESTAMP}@example.com` }
    });

    if (wpCreate.status !== 201) {
        console.error('FAILED to create WP lead:', wpCreate.data);
        return;
    }
    const wpId = wpCreate.data.id;
    console.log(`   WP Lead Created. ID: ${wpId}`);

    // 2. TRIGGER SYNC
    console.log('2. Triggering CRM Sync...');
    // We can call the sync endpoint
    await crmRequest('POST', '/leads/sync');

    // Give it a moment to process (since it might be async inside backend if not awaited properly, 
    // but our controller calls service.syncLeads which is async but awaited? No, controller returns promise.)
    // Wait 15 seconds mainly for DB commit
    console.log('   Waiting 15s for sync...');
    await new Promise(r => setTimeout(r, 15000));

    // 3. FIND IN CRM
    console.log('3. Finding Lead in CRM...');
    const allLeads = await crmRequest('GET', '/leads');
    console.log(`   CRM returned ${allLeads.data.length} leads.`);

    // Debug: Print the last 3 leads to see structure
    const last3 = allLeads.data.slice(0, 3);
    console.log('   Last 3 leads:', JSON.stringify(last3, null, 2));

    const crmLead = allLeads.data.find(l => {
        if (!l.data) return false;
        // Check both nesting levels just in case
        const innerId = l.data.wp_id || (l.data.data && l.data.data.wp_id);
        return innerId == wpId;
    });

    if (!crmLead) {
        console.error('   FAILED: Lead not found in CRM after sync.');
        console.log('   (User might need to wait for automatic sync if manual trigger failed)');
        return;
    }
    const crmId = crmLead.id;
    console.log(`   CRM Lead Found. ID: ${crmId}`);

    // 4. DELETE FROM CRM
    console.log('4. Deleting from CRM...');
    const delRes = await crmRequest('DELETE', `/leads/${crmId}`);
    if (delRes.status >= 300) {
        console.error('   FAILED DELETE API:', delRes.data);
        return;
    }
    console.log('   CRM Delete Success.');

    // 5. VERIFY GONE FROM WP
    console.log('5. Verifying removal from WordPress...');
    // Try to get it again
    const wpCheck = await wpRequest('GET', `/wp-json/wp/v2/auto_lead/${wpId}`);
    // If deleted, it should be 404 or 410 or "trash" if we didn't force.
    // Our logic sends force=true, so it should be 404.

    if (wpCheck.status === 404 || wpCheck.status === 410) {
        console.log('   SUCCESS: Lead is 404 Not Found on WordPress!');
    } else {
        console.error('   FAILED: Lead still exists on WP via API status:', wpCheck.status);
    }
}

run();
