const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- STATUS DISTRIBUTION ---');
    const leads = await prisma.lead.groupBy({
        by: ['status'],
        _count: {
            id: true
        }
    });
    console.log(leads);
    console.log('--- END DISTRIBUTION ---');
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });
