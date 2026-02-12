import https from 'node:https';

const username = 'CRM';
const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
const hostname = 'www.automazza.it';
const path = '/wp-json/wp/v2/auto_lead?per_page=5';

const auth = Buffer.from(`${username}:${password}`).toString('base64');

const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'GET',
    headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'Node.js/TestScript'
    }
};

console.log(`Testing connection to https://${hostname}${path}`);

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            if (res.statusCode === 200) {
                const json = JSON.parse(data);
                console.log(`SUCCESS! Found ${json.length} leads.`);
                if (json.length > 0) {
                    console.log('Sample Lead Data:', JSON.stringify(json[0], null, 2));
                }
            } else {
                console.log('ERROR BODY:', data);
            }
        } catch (e) {
            console.error('FAILED TO PARSE JSON:', e.message);
            console.log('RAW DATA:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
