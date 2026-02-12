const https = require('https');
const http = require('http');

const WP_AUTH = Buffer.from('CRM:oFLi 6VNh KvcG RRk9 UZmo QfhN').toString('base64');
const TEST_EMAIL = `merge_test_${Date.now()}@example.com`;

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

async function runMergeTest() {
    console.log(`--- MERGE TEST: ${TEST_EMAIL} ---`);

    // 1. CREATE LEAD A (Original)
    console.log('1. Creating Lead A on WP...');
    const resA = await wpRequest('POST', '/wp-json/wp/v2/auto_lead', {
        title: 'User Original',
        status: 'publish',
        lead_data: { name: 'User Original', email: TEST_EMAIL, msg: 'First Request' }
    });
    const wpIdA = resA.data.id;
    console.log(`   WP Lead A Created. ID: ${wpIdA}`);

    // 2. SYNC
    console.log('2. Syncing...');
    await crmRequest('POST', '/leads/sync');
    await new Promise(r => setTimeout(r, 20000));

    // 3. GET CRM ID
    const allLeads1 = await crmRequest('GET', '/leads');
    console.log(`   CRM returned ${allLeads1.data.length} leads.`);
    const emails = allLeads1.data.map(l => l.email);
    console.log('   Found Emails:', emails);

    const leadA = allLeads1.data.find(l => l.email === TEST_EMAIL);
    if (!leadA) { console.error('FAILED: Lead A not found in CRM'); return; }
    console.log(`   Lead A found in CRM. ID: ${leadA.id}. Status: ${leadA.status}`);

    // 4. SOFT DELETE LEAD A
    console.log('4. Deleting Lead A in CRM (Status -> Trash)...');
    // Note: This triggers remote delete! But for this test, let's assume remote delete might fail or we just modify status directly via Prisma if API delete is too aggressive.
    // Actually, calling DELETE API will try to delete WP ID A.
    // That's fine. If WP ID A is deleted, and we create WP ID B, it's a perfect test.
    await crmRequest('DELETE', `/leads/${leadA.id}`);

    // 5. CREATE LEAD B (Same Email, New WP ID)
    console.log('5. Creating Lead B on WP (Same Email)...');
    const resB = await wpRequest('POST', '/wp-json/wp/v2/auto_lead', {
        title: 'User Returning',
        status: 'publish',
        lead_data: { name: 'User Returning', email: TEST_EMAIL, msg: 'Second Request' }
    });
    const wpIdB = resB.data.id;
    console.log(`   WP Lead B Created. ID: ${wpIdB}`);

    // 6. SYNC
    console.log('6. Syncing again...');
    await crmRequest('POST', '/leads/sync');
    await new Promise(r => setTimeout(r, 10000));

    // 7. VERIFY MERGE
    const allLeads2 = await crmRequest('GET', '/leads');
    // We should see only ONE lead with this email
    const matchingLeads = allLeads2.data.filter(l => l.email === TEST_EMAIL);
    console.log(`   Found ${matchingLeads.length} leads with email ${TEST_EMAIL}.`);

    if (matchingLeads.length === 1) {
        const mergedLead = matchingLeads[0];
        console.log(`   Merged Lead ID: ${mergedLead.id} (Should match Lead A: ${leadA.id})`);
        console.log(`   Merged Lead Status: ${mergedLead.status} (Should be 'new')`);
        console.log(`   Merged Lead WP ID: ${mergedLead.data.wp_id} (Should be ${wpIdB})`);

        if (mergedLead.id === leadA.id && mergedLead.status === 'new' && mergedLead.data.wp_id == wpIdB) {
            console.log('   ✅ SUCCESS: Lead merged and reopened correctly.');
        } else {
            console.log('   ❌ FAILED: Merge logic incorrect.');
        }
    } else {
        console.log('   ❌ FAILED: Duplicate leads found.');
    }
}

runMergeTest();
