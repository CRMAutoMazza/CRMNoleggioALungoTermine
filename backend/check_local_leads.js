const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20
    });

    console.log('--- CHECKING FOR WP_ID 89 ---');
    let found = false;
    for (const l of leads) {
        let wpId = l.data && l.data.wp_id ? l.data.wp_id : 'N/A';
        if (wpId == 89) found = true;
        console.log(`WP_ID: ${wpId} | Created: ${l.createdAt}`);
    }

    console.log(`FOUND 89: ${found}`);
}

main();
