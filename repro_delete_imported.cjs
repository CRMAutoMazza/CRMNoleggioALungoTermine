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
    console.log('--- TEST IMPORTED DELETE ---');

    // 1. Create Simulated Imported Lead
    console.log('1. Creating Simulated Imported Lead...');
    const createRes = await request('POST', '/leads', {
        firstName: 'Simulated',
        lastName: 'Import',
        email: 'imported@test.com',
        source: 'website_import', // Flag as imported
        data: {
            wp_id: 999999, // Fake WP ID
            message: 'This is a test imported lead'
        }
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

    if (delRes.status >= 400) {
        console.error('   DELETE FAILED:', delRes.data);
    } else {
        console.log('   DELETE SUCCESS');
    }

    // 3. Verify
    console.log('3. Verifying...');
    const listRes = await request('GET', `/leads/${leadId}`);
    // Ideally GET /leads/:id should return the lead even if trash? 
    // Wait, findAll filters out trash. findOne usually does NOT filter out trash in standard prisma unless middleware. 
    // EXCEPT we didn't add filter in findOne in service?
    // Let's check finding all again.

    const allRes = await request('GET', '/leads');
    const found = allRes.data.find(l => l.id === leadId);

    if (found) {
        console.error('   FAILED: Lead still in list with status:', found.status);
    } else {
        console.log('   SUCCESS: Lead gone from list.');
    }
}

test();
