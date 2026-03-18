import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  adapter: {
    url: process.env.DATABASE_URL,  // must point to your Supabase 5432 direct URL
  },
});

export default prisma;