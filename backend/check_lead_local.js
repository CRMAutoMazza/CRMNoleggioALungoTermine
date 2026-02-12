
const { PrismaClient } = require('@prisma/client');

// Try common local credentials
const urls = [
    'postgresql://postgres:postgres@localhost:5432/postgres',
    'postgresql://postgres:admin@localhost:5432/postgres',
    'postgresql://postgres:password@localhost:5432/postgres',
    'postgresql://postgres:postgres@localhost:5432/crm',
    'postgresql://postgres:postgres@localhost:5432/automazza'
];

async function checkUrl(url) {
    console.log(`Trying ${url}...`);
    // Create a dynamic client for this URL
    // Limitation: Prisma schema datasource url is static env("DATABASE_URL").
    // Converting url to env var for this process?
    // We can instantiate PrismaClient with `datasourceUrl` option.

    const prisma = new PrismaClient({
        datasources: {
            db: { url }
        }
    });

    try {
        const count = await prisma.lead.count();
        console.log(`SUCCESS! Found ${count} leads in ${url}`);

        const first = await prisma.lead.findFirst();
        console.log('Sample:', first);
        return true;
    } catch (e) {
        console.log(`Failed: ${e.message.split('\n')[0]}`); // Compact error
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

async function main() {
    console.log('--- CHECK LOCAL POSTGRES ---');
    for (const url of urls) {
        if (await checkUrl(url)) break;
    }
}

main();
