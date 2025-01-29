import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FarmsController],
  providers: [FarmsService, PrismaService],
})
export class FarmsModule {}
