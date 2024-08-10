import { PrismaService } from '../../src/prisma/prisma.service';

export class DbTestHelper {
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  async clearDb() {
    const tableNames = await this.prisma.$queryRaw<
      Array<{ table_name: string }>
    >`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = (SELECT DATABASE())`;

    const tables = tableNames
      .map(({ table_name }) => table_name)
      .filter((name) => name !== '_prisma_migrations');

    try {
      // Disable foreign key checks
      await this.prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);

      // Truncate all tables
      for (const table of tables) {
        await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE \`${table}\`;`);
      }

      // Re-enable foreign key checks
      await this.prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
    } catch (error) {
      console.error('Error clearing database:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async isEmpty(): Promise<boolean> {
    const users = await this.prisma.user.findMany();
    if (users.length > 0) {
      console.log('Users table is not empty:', users);
      return false;
    }
    console.log('Users table is empty.');
    return true;
  }
}
