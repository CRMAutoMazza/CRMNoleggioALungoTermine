const http = require('http');

console.log('Testing API connectivity to http://localhost:3000/leads ...');

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/leads',
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(`DATA LENGTH: ${Array.isArray(parsedData) ? parsedData.length : 'Not an array'}`);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                console.log('FIRST LEAD:', JSON.stringify(parsedData[0], null, 2));
            } else {
                console.log('BODY:', rawData);
            }
        } catch (e) {
            console.error('ERROR PARSING JSON:', e.message);
            console.log('RAW BODY:', rawData);
        }
    });
});

req.on('error', (e) => {
    console.error(`PROBLEM WITH REQUEST: ${e.message}`);
});

req.end();
