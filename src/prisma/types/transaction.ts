import { PrismaService } from '../prisma.service';

/**
 * Interface describes transaction instance
 */
export type transaction = Omit<
  PrismaService,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;
