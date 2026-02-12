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

async function test() {
    console.log('--- TEST SOFT DELETE ---');

    // 1. Create Lead
    console.log('1. Creating Dummy Lead...');
    const createRes = await request('POST', '/leads', {
        firstName: 'Test',
        lastName: 'DeleteMe',
        email: 'delete@test.com'
    });

    if (createRes.status !== 201) {
        console.error('Failed to create lead:', createRes.data);
        return;
    }
    const leadId = createRes.data.id;
    console.log('   Created Lead ID:', leadId);

    // 2. Delete Lead
    console.log('2. Deleting Lead...');
    const delRes = await request('DELETE', `/leads/${leadId}`);
    console.log(`   Delete Status: ${delRes.status}`);
    console.log('   Delete Response:', JSON.stringify(delRes.data));
    if (delRes.status >= 400) {
        console.error('   DELETE FAILED:', JSON.stringify(delRes.data));
    }

    // 3. Verify it is GONE from list
    console.log('3. Fetching All Leads...');
    const listRes = await request('GET', '/leads');
    const found = listRes.data.find(l => l.id === leadId);

    if (found) {
        console.error('FAILED: Lead still appears in list!');
        console.log('Lead Status:', found.status);
    } else {
        console.log('SUCCESS: Lead is hidden from list.');
    }
}

test();
