const http = require('http');

const data = JSON.stringify({
    firstName: "Test",
    lastName: "Manuale",
    email: "test_manuale@example.com",
    status: "new",
    data: { note: "Created via CLI verification" }
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/leads',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
