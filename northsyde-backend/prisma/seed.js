import { prisma } from '../prisma.js';  // adjust path if needed
import bcrypt from 'bcryptjs';

async function main() {
  // Create admin user if not exists
  const adminEmail = 'admin@northsyde.com';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
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

  // Sample events
  const events = [
    {
      title: 'Glasshouse x NSM Concert',
      description: 'A memorable night of music and culture.',
      date: new Date('2024-11-15T19:00:00Z'),
      location: 'Glasshouse, Kaduna',
      imageUrl: 'https://example.com/glasshouse.jpg',
      isFeatured: true,
      createdBy: admin.id
    },
    {
      title: 'Owl Fest Kaduna',
      description: 'Northern Nigeria’s biggest youth festival.',
      date: new Date('2024-09-10T14:00:00Z'),
      location: 'Kaduna',
      imageUrl: 'https://example.com/owl-kaduna.jpg',
      isFeatured: true,
      createdBy: admin.id
    },
    {
      title: 'Owl Fest Abuja',
      description: 'The energy moves to Abuja.',
      date: new Date('2024-10-05T16:00:00Z'),
      location: 'Abuja',
      imageUrl: 'https://example.com/owl-abuja.jpg',
      isFeatured: true,
      createdBy: admin.id
    },
    {
      title: 'Picnic in the Park UK',
      description: 'A cultural day out in the UK.',
      date: new Date('2024-08-20T12:00:00Z'),
      location: 'London, UK',
      imageUrl: 'https://example.com/picnic-uk.jpg',
      isFeatured: true,
      createdBy: admin.id
    }
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log('Seeded events');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });