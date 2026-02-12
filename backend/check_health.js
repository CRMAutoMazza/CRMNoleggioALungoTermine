const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/leads',
    method: 'GET',
    timeout: 5000
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', () => { }); // Consume
});

req.on('error', (e) => {
    console.error(`PROBLEM: ${e.message}`);
});

req.on('timeout', () => {
    req.destroy();
    console.error('TIMEOUT');
});

req.end();
