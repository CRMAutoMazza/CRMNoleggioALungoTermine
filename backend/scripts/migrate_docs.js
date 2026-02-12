const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Config from Frontend (Hardcoded for migration tool reliability)
const SUPABASE_URL = 'https://mcxbcxtwtloinifjwfeq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGJjeHR3dGxvaW5pZmp3ZmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzA2NTMsImV4cCI6MjA4MTcwNjY1M30.MlzOxkTqqJPKUV_Vu7L_CkPlofy30XG9nnQCz1OlBHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOCAL_DOCS_PATH = path.join(process.env.USERPROFILE || process.env.HOME, 'Documents', 'AutoMazza_Data');
const BUCKET_NAME = 'documents';

async function migrate() {
    console.log(`Starting migration from ${LOCAL_DOCS_PATH} to bucket '${BUCKET_NAME}'...`);

    if (!fs.existsSync(LOCAL_DOCS_PATH)) {
        console.error('Local documents folder not found!');
        return;
    }

    const processDirectory = async (dir, prefix = '') => {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
            const localPath = path.join(dir, item.name);
            // Normalized path for storage
            const relativePath = path.join(prefix, item.name).replace(/\\/g, '/');

            if (item.isDirectory()) {
                await processDirectory(localPath, relativePath);
            } else {
                console.log(`Uploading: ${relativePath}...`);
                const fileContent = fs.readFileSync(localPath);

                // Content Type detection (basic)
                let contentType = 'application/octet-stream';
                if (item.name.endsWith('.pdf')) contentType = 'application/pdf';
                else if (item.name.endsWith('.jpg')) contentType = 'image/jpeg';
                else if (item.name.endsWith('.png')) contentType = 'image/png';

                const { data, error } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(relativePath, fileContent, {
                        contentType: contentType,
                        upsert: true
                    });

                if (error) {
                    console.error(`FAILED ${relativePath}:`, error.message);
                } else {
                    console.log(`SUCCESS ${relativePath}`);
                }
            }
        }
    };

    await processDirectory(LOCAL_DOCS_PATH);
    console.log('Migration completed.');
}

migrate();
