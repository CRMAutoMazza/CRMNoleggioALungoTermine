import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Debugging Leads ---');

    // Count all
    const total = await prisma.lead.count();
    console.log(`Total Leads: ${total}`);

    // Count by status
    const byStatus = await prisma.lead.groupBy({
        by: ['status'],
        _count: {
            status: true
        }
    });
    console.log('By Status:', byStatus);

    // Check recent leads
    const recent = await prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    console.log('Recent 5 Leads:', JSON.stringify(recent, null, 2));

    // Check trash
    const trash = await prisma.lead.count({ where: { status: 'trash' } });
    console.log(`Trash Leads: ${trash}`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
