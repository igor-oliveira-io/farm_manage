import { Module } from '@nestjs/common';
import { PlantedCropsService } from './planted_crops.service';
import { PlantedCropsController } from './planted_crops.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlantedCropsController],
  providers: [PlantedCropsService, PrismaService],
})
export class PlantedCropsModule {}
