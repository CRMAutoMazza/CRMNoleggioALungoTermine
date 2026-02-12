const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Cleaning leads table...');
    try {
        // Delete all leads
        // Note: This does NOT fire the 'remove' hook in LeadsService, 
        // so it won't delete from WordPress. This is purely local cleanup.
        const { count } = await prisma.lead.deleteMany({});
        console.log(`✅ Successfully deleted ${count} leads from the database.`);
    } catch (e) {
        console.error('Error cleaning database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
