import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const output = [];
    output.push('--- Debugging Leads ---');

    // Count all
    const total = await prisma.lead.count();
    output.push(`Total Leads: ${total}`);

    // Count by status
    const byStatus = await prisma.lead.groupBy({
        by: ['status'],
        _count: {
            status: true
        }
    });
    output.push(`By Status: ${JSON.stringify(byStatus, null, 2)}`);

    // Check recent leads
    const recent = await prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    output.push(`Recent 5 Leads: ${JSON.stringify(recent, null, 2)}`);

    fs.writeFileSync('debug_output.txt', output.join('\n'));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
