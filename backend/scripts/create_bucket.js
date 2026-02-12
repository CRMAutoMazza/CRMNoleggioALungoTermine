const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mcxbcxtwtloinifjwfeq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_JWT_SECRET;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BUCKET_NAME = 'documents';

async function createBucket() {
    console.log(`Creating bucket '${BUCKET_NAME}'...`);

    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError) console.error('Error listing buckets:', listError);

    const exists = buckets?.find(b => b.name === BUCKET_NAME);

    if (exists) {
        console.log(`Bucket '${BUCKET_NAME}' already exists.`);
    } else {
        const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
            public: false, // Default to private for safety, or true if we want easy access? 
            // For now private + signed URLs is safer, but public is easier for MVP. 
            // Let's go with PUBLIC for now to match local file access ease, 
            // but typically CRM docs should be private.
            // User asked for "Online", simplicity is key. 
            // I will set public: true for now, can restrict later.
            public: true
        });

        if (error) {
            console.error('Error creating bucket:', error);
        } else {
            console.log(`Bucket '${BUCKET_NAME}' created successfully.`);
        }
    }
}

createBucket();
