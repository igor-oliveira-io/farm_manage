import { Module } from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { HarvestsController } from './harvests.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [HarvestsController],
  providers: [HarvestsService, PrismaService],
})
export class HarvestsModule {}
