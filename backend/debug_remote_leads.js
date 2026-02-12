const https = require('https');

const username = 'CRM';
const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
const hostname = 'www.automazza.it';
const path = '/wp-json/wp/v2/auto_lead?per_page=20&status=any';

const auth = Buffer.from(`${username}:${password}`).toString('base64');
const options = {
    hostname: hostname,
    path: path,
    method: 'GET',
    headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': 'NestJS/CRM',
        'Content-Type': 'application/json'
    },
    timeout: 10000
};

console.log(`Fetching from https://${hostname}${path}...`);

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            try {
                const leads = JSON.parse(data);
                console.log(`Found ${leads.length} leads remotely.`);
                leads.forEach(l => {
                    console.log(`- [${l.id}] ${l.date} (Status: ${l.status})`);
                });
            } catch (e) {
                console.error('JSON Parse Error:', e);
            }
        } else {
            console.log('Body:', data);
        }
    });
});

req.on('error', (e) => console.error('Request Error:', e));
req.end();
