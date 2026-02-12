const http = require('http');

// Configuration
const CRM_API_URL = 'http://127.0.0.1:3000';
const TEST_EMAIL = 'check_merge_browser@example.com';

function crmRequest(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' },
            // rejectUnauthorized: false // Not needed for http
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: data ? JSON.parse(data) : {} }));
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

(async () => {
    console.log(`--- BROWSER MERGE TEST: ${TEST_EMAIL} ---`);

    // 1. SYNC
    console.log('1. Syncing...');
    await crmRequest('POST', '/leads/sync');
    await new Promise(r => setTimeout(r, 15000));

    // 2. CHECK LEAD
    console.log('2. Checking CRM for lead...');
    const allLeads = await crmRequest('GET', '/leads');
    console.log(`   CRM returned ${allLeads.data.length} leads.`);

    const matchingLeads = allLeads.data.filter(l => l.email === TEST_EMAIL);

    if (matchingLeads.length === 0) {
        console.error('FAILED: Lead not found locally.');
        process.exit(1);
    }

    if (matchingLeads.length > 1) {
        console.error(`FAILED: DUPLICATE LEADS FOUND! Count: ${matchingLeads.length}`);
        matchingLeads.forEach(l => console.log(`   - ID: ${l.id}, WP_ID: ${l.data.wp_id}, Status: ${l.status}`));
        process.exit(1);
    }

    const lead = matchingLeads[0];

    console.log(`SUCCESS: Found Lead. ID: ${lead.id}, WP_ID: ${lead.data ? lead.data.wp_id : 'N/A'}`);
    console.log('Status:', lead.status);
    console.log('Created At:', lead.createdAt);
    console.log('Updated At:', lead.updatedAt);

})();
