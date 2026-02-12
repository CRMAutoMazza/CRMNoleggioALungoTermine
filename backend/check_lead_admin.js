
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const supabaseUrl = 'https://mcxbcxtwtloinifjwfeq.supabase.co';
const supabaseJwtSecret = 'c8dQbMnAENAUOV/8ujfcglilNU+UKpSdIygbytI01R4v2dtJNScOjyMi7SmV9WnV2OBRkYOomxhqUys98dn+tA==';

// Sign with Base64 decoded secret
const serviceRoleToken = jwt.sign(
    {
        role: 'service_role',
        iss: 'supabase',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
    },
    Buffer.from(supabaseJwtSecret, 'base64')
);

// Create client with Service Role Token
// Note: We pass the token as the 'key' (Supabase client accepts JWT as key for Auth header)
// OR we can pass anon key and set global auth?
// Supabase constructor: createClient(url, key, options)
// Key is usually Anon or Service Role KEY (which is a JWT).
// So passing our signed JWT should work if signature is valid.
const supabase = createClient(supabaseUrl, serviceRoleToken);

async function main() {
    console.log('--- CHECK SUPABASE ADMIN (SERVICE ROLE) ---');
    console.log('Token created length:', serviceRoleToken.length);

    const { count, error: countError } = await supabase
        .from('Lead')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('Count Error:', countError.message);
    } else {
        console.log(`Total Leads (ADMIN): ${count}`);
    }

    const { data, error } = await supabase
        .from('Lead')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Fetch Error:', error.message);
    } else {
        if (data && data.length > 0) {
            console.log('First Lead:', data[0].firstName, data[0].lastName);
        } else {
            console.log('First Lead: None found.');
        }
    }
}

main();
