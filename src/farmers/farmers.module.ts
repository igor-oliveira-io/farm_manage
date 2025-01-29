import { Module } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FarmersController],
  providers: [FarmersService, PrismaService],
})
export class FarmersModule {}
