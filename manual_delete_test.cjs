const http = require('http');

// ID from previous debug log
const LEAD_ID = '02deb312-eceb-431f-90ce-73db52d4f023'; // Browser Test Lead48edd3';

const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                // We need a dummy token if auth is enabled, but wait, 
                // my previous test failed with 401 because I didn't send one.
                // I need to bypass auth OR create a mock token if I can't generate a real one easily.
                // OR I can temporarily disable AuthGuard in the controller for this test.
                // actually, for this specific test script, I'll try to use the verify_wp_sync approach or 
                // just assume I can't test invalid auth without a token.
                // Let's TRY to find a way to get a token or disable auth.
                // Disabling auth is risky/intrusive.
                // I'll add a temporary "bypass" header to the controller? No.
                // I'll grab a token from the frontend logs? No access.
                // I'll use the 'fake' token from api.js if it exists? No.
                // WAIT! I can use a simpler approach. I'll modify the backend to LOG why it fails 
                // and use the Frontend to drive it.
                // BUT the user says "it doesn't delete".
                // I'll try to DELETE with a fake token just to see if it even reaches the controller logs I added.
                'Authorization': 'Bearer FAKE_TOKEN'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Response Code: ${res.statusCode}`);
                console.log(`Response Body: ${data}`);
                resolve();
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

console.log(`Attempting to DELETE lead ${LEAD_ID}...`);
request('DELETE', `/leads/${LEAD_ID}`);
