import http from 'http';

const data = JSON.stringify({
    firstName: "Test",
    lastName: "Manuale",
    email: "test@example.com",
    status: "new",
    tenantId: "default",
    phone: "1234567890",
    message: "Questo è un test manuale",
    source: "script"
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/leads',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

console.log('Sending Test Lead to http://localhost:3000/leads...');

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log('BODY: ' + body);
        if (res.statusCode === 201 || res.statusCode === 200) {
            console.log('\n✅ SUCCESS! Lead created.');
        } else {
            console.log('\n❌ FAILURE. Check server logs.');
        }
    });
});

req.on('error', (e) => {
    console.error(`\n❌ REQUEST ERROR: ${e.message}`);
    console.log('Is the CRM Backend running?');
});

req.write(data);
req.end();
