const https = require('https');

const username = 'CRM';
const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
const hostname = 'www.automazza.it';

const auth = Buffer.from(`${username}:${password}`).toString('base64');

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: hostname,
            path: path,
            method: method,
            headers: {
                'Authorization': `Basic ${auth}`,
                'User-Agent': 'NodeJS/Test',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
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
}

async function testV2() {
    console.log('--- TEST WP API (V2) ---');

    // 1. Create
    console.log('1. Creating Test Lead...');
    const createRes = await request('POST', '/wp-json/wp/v2/auto_lead', {
        title: 'Delete Me Test',
        status: 'publish',
        lead_data: { name: 'Test User' } // Custom structure depends on plugin
    });

    console.log('   Status:', createRes.status);
    if (createRes.status !== 201) {
        console.error('   FAILED TO CREATE:', JSON.stringify(createRes.data));
        return;
    }

    const wpId = createRes.data.id;
    console.log('   Created WP ID:', wpId);

    // 2. Delete
    console.log(`2. Deleting WP Lead ${wpId}...`);
    const delRes = await request('DELETE', `/wp-json/wp/v2/auto_lead/${wpId}?force=true`); // force=true to skip trash

    console.log('   Status:', delRes.status);
    if (delRes.status >= 200 && delRes.status < 300) {
        console.log('   SUCCESS: Deleted.');
    } else {
        console.error('   FAILED TO DELETE:', JSON.stringify(delRes.data));
    }
}

testV2();
