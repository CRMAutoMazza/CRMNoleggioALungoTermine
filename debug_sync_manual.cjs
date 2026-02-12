const https = require('https');

async function debugSync() {
    console.log('--- STARTING SYNC DEBUG ---');

    const username = 'CRM';
    const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN'; // Hardcoded credentials from leads.service.ts
    const hostname = 'www.automazza.it';
    const path = '/wp-json/wp/v2/auto_lead?per_page=5&status=publish';

    console.log(`Connecting to https://${hostname}${path}...`);

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const options = {
        hostname: hostname,
        path: path,
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            // 'User-Agent': 'NestJS/CRM', // Let's try without specific UA first or mimic browser
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Content-Type': 'application/json'
        },
        timeout: 10000
    };

    const req = https.request(options, (res) => {
        let data = '';
        console.log(`Response Status: ${res.statusCode}`);
        console.log(`Response Headers:`, res.headers);

        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log('--- RESPONSE BODY START ---');
            if (res.statusCode >= 200 && res.statusCode < 300) {
                try {
                    const json = JSON.parse(data);
                    console.log(`Successfully fetched ${json.length} leads.`);
                    if (json.length > 0) {
                        console.log('Sample Lead:', JSON.stringify(json[0], null, 2));
                    }
                } catch (e) {
                    console.error('Failed to parse JSON:', e.message);
                    console.log('Raw Data:', data.substring(0, 500) + '...');
                }
            } else {
                console.error(`Request failed with status ${res.statusCode}`);
                console.log('Raw Body:', data);
            }
            console.log('--- RESPONSE BODY END ---');
        });
    });

    req.on('error', (e) => {
        console.error('Request Error:', e);
    });

    req.end();
}

debugSync();
