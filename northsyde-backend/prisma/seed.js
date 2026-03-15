import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
    //Create admin user if not exists
    const adminEmail ='admin@northsydeglobal.com';
    let admin = await prisma.user.findUnique({ where: { email: adminEmail}});
    if(!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        admin = await prisma.user.create({
            data: {
                name: 'Admin User',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
                portfolio: null,
                discipline: 'OTHER'
            }
        });
        console.log('Admin user created');
    }

    //Sample events
    const events =[
        {
            title: 'Glasshouse x NSM concert',
            description: 'A memorable night of music and culture.',
            date: new Date('2024-11-15T19:00:00Z'),
            location: 'Glasshouse, Kaduna',
            imageUrl:'',
            isFeatured: true,
            createdBy: admin.id
        }
    ];

    for (const event of events) {
        await prisma.event.create({ data: event});
    }
    console.log('Seeded event');
}

main()
    .catch(e=>{
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconduct();
    });