
const username = 'CRM';
const password = 'oFLi 6VNh KvcG RRk9 UZmo QfhN';
const hostname = 'www.automazza.it';
const path = '/wp-json/wp/v2/auto_lead?per_page=5&status=publish';

async function test() {
    console.log('Fetching from:', `https://${hostname}${path}`);
    const auth = Buffer.from(username + ':' + password).toString('base64');

    try {
        const response = await fetch(`https://${hostname}${path}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'User-Agent': 'NodeJS/Test'
            }
        });

        console.log(`STATUS: ${response.status}`);
        const text = await response.text();
        console.log('Response Body Length:', text.length);

        if (response.ok) {
            try {
                const json = JSON.parse(text);
                console.log('Received JSON Array Length:', json.length);
                if (json.length > 0) {
                    console.log('First Lead ID:', json[0].id);
                    console.log('First Lead Title:', json[0].title.rendered);
                }
            } catch (e) {
                console.log('Error parsing JSON:', e.message);
                console.log('Snippet:', text.substring(0, 200));
            }
        } else {
            console.log('Error Body:', text);
        }

    } catch (e) {
        console.error('Request Error:', e);
    }
}

test();
