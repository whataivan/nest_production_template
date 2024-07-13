import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Prisma module is responsible for work with database
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
