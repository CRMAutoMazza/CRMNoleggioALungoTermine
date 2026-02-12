import http from 'node:http';

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/leads/sync',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('BODY:', data);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
