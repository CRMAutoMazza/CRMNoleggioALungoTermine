
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- START CHECK ---');
    try {
        const count = await prisma.lead.count();
        console.log(`Total Leads: ${count}`);

        const first = await prisma.lead.findFirst();
        console.log('First Lead:', first);

        if (count > 0) {
            const hector = await prisma.lead.findFirst({
                where: { firstName: { contains: 'Hector', mode: 'insensitive' } }
            });
            console.log('Hector found?', hector);
        }

    } catch (e) {
        console.error('ERROR:', e.message);
    }
    console.log('--- END CHECK ---');
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });
