const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/leads',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const leads = JSON.parse(data);
            if (leads.length > 0) {
                console.log('Lead 0 Data Keys:', Object.keys(leads[0].data));
                console.log('Lead 0 Data Object:', JSON.stringify(leads[0].data, null, 2));
            } else {
                console.log('No leads found.');
            }
        } catch (e) {
            console.log('Error parsing JSON');
        }
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();
