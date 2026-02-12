const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Configuring Supabase Storage via SQL...");
    try {
        // 1. Create Bucket (public: true)
        await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('documents', 'documents', true, null, null)
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
        console.log("Bucket 'documents' ensured.");

        // 2. Enable RLS (just in case)
        // storage.objects usually has RLS enabled by default.

        // 3. Create Policy for Insert (Upload)
        // We try/catch block for policy creation as 'CREATE POLICY' doesn't support 'IF NOT EXISTS' in all postgres versions easily without a do block.
        // simpler to Drop then Create.
        try {
            await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;`);
            await prisma.$executeRawUnsafe(`
            CREATE POLICY "Allow public uploads" ON storage.objects 
            FOR INSERT 
            TO public 
            WITH CHECK (bucket_id = 'documents');
        `);
            console.log("Upload policy created.");
        } catch (e) { console.error("Policy Upload Error (might exist):", e.message); }

        try {
            await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;`);
            await prisma.$executeRawUnsafe(`
            CREATE POLICY "Allow public downloads" ON storage.objects 
            FOR SELECT 
            TO public 
            USING (bucket_id = 'documents');
        `);
            console.log("Download policy created.");
        } catch (e) { console.error("Policy Download Error:", e.message); }

        // 4. Update/Delete policies?
        // Let's add Update/Delete for convenience during migration test
        try {
            await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;`);
            await prisma.$executeRawUnsafe(`
            CREATE POLICY "Allow public delete" ON storage.objects 
            FOR DELETE
            TO public 
            USING (bucket_id = 'documents');
        `);
            console.log("Delete policy created.");
        } catch (e) { console.error("Policy Delete Error:", e.message); }

    } catch (e) {
        console.error("General Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
