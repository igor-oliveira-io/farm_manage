import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmersModule } from './farmers/farmers.module';
import { PrismaService } from './prisma.service';
import { FarmsModule } from './farms/farms.module';
import { HarvestsModule } from './harvests/harvests.module';
import { PlantedCropsModule } from './planted_crops/planted_crops.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    FarmersModule,
    FarmsModule,
    HarvestsModule,
    PlantedCropsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
