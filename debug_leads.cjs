const http = require('http');

const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = data ? JSON.parse(data) : {};
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

async function inspect() {
    console.log('--- INSPECT LEADS ---');
    const listRes = await request('GET', '/leads');

    if (listRes.status !== 200) {
        console.error('Failed to list leads:', listRes.status);
        return;
    }

    const leads = listRes.data;
    console.log(`Found ${leads.length} leads.`);

    // Separate manual vs imported
    const imported = leads.filter(l => l.data && (l.data.wp_id || l.data.source === 'website_import'));
    const manual = leads.filter(l => !l.data || (!l.data.wp_id && l.data.source !== 'website_import'));

    console.log(`Imported: ${imported.length}`);
    console.log(`Manual: ${manual.length}`);

    if (imported.length > 0) {
        console.log('\n--- SAMPLE IMPORTED LEAD ---');
        console.log(JSON.stringify(imported[0], null, 2));
    } else {
        console.log("\nNo imported leads found.");
    }

    if (manual.length > 0) {
        console.log('\n--- SAMPLE MANUAL LEAD ---');
        console.log(JSON.stringify(manual[0], null, 2));
    }
}

inspect();
