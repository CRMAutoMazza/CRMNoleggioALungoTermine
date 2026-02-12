const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching leads...');
    const leads = await prisma.lead.findMany({
        where: {
            OR: [
                { firstName: { contains: 'Hector' } },
                { firstName: { contains: 'Rocco' } },
                { firstName: { contains: 'Domus' } }
            ]
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            data: true // Phone is likely in here
        }
    });

    console.log('Found leads:', leads.length);
    if (leads.length > 0) {
        const lead = leads[0];
        const fs = require('fs');
        fs.writeFileSync('debug_lead_dump.json', JSON.stringify(lead, null, 2));
        console.log('Dumped lead data to debug_lead_dump.json');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
