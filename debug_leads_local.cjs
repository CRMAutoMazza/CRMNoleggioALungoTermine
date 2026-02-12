
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
    console.log('--- INSPECT LEADS (LOCAL BACKEND) ---');
    try {
        const listRes = await request('GET', '/leads');

        if (listRes.status !== 200) {
            console.error('Failed to list leads:', listRes.status, listRes.data);
            return;
        }

        const leads = listRes.data;
        if (Array.isArray(leads)) {
            console.log(`Found ${leads.length} leads.`);
            if (leads.length > 0) {
                console.log('Sample:', JSON.stringify(leads[0], null, 2));
            }
        } else {
            console.log('Response is not an array:', leads);
        }
    } catch (e) {
        console.error('Connection failed:', e.message);
    }
}

inspect();
