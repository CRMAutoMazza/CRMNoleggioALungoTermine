const fs = require('fs');
const http = require('http');
const path = require('path');

// 1. Create a dummy CSV file
const csvContent = `name,email,phone,message
Giulio Testa,giulio@example.com,1234567890,This is a test lead from CSV
Maria Rossi,maria@example.com,0987654321,Another test lead
No Email,,1112223333,Only phone here
`;

const filePath = path.join(__dirname, 'test_leads.csv');
fs.writeFileSync(filePath, csvContent);
console.log('Created dummy CSV file at:', filePath);

// 2. Upload it to the endpoint
function uploadCsv() {
    return new Promise((resolve, reject) => {
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

        let body = '';
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="file"; filename="test_leads.csv"\r\n`;
        body += `Content-Type: text/csv\r\n\r\n`;
        body += csvContent;
        body += `\r\n--${boundary}--\r\n`;

        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/leads/import-csv',
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': Buffer.byteLength(body)
            }
        };

        console.log('Sending request to POST /leads/import-csv ...');

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ status: res.statusCode, body: JSON.parse(data) });
                    } else {
                        resolve({ status: res.statusCode, body: data, error: 'Status not 200' });
                    }
                } catch (e) {
                    resolve({ status: res.statusCode, body: data, error: 'JSON Parse Error' });
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(body);
        req.end();
    });
}

async function runTest() {
    try {
        const result = await uploadCsv();
        console.log('Upload Result:', JSON.stringify(result, null, 2));
        fs.writeFileSync(path.join(__dirname, 'test_result.json'), JSON.stringify(result, null, 2));

        if (result.body && result.body.success && result.body.imported >= 2) {
            console.log('SUCCESS: CSV Import Verified.');
        } else {
            console.error('FAILURE: Unexpected result.');
        }
    } catch (e) {
        console.error('Test Failed:', e);
        fs.writeFileSync(path.join(__dirname, 'test_result.json'), JSON.stringify({ error: e.message }));
    }
}

runTest();
