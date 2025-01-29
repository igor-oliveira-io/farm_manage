/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import {
  CropsByTypeResponse,
  FarmsByStateResponse,
  LandUseResponse,
  TotalFarmsResponse,
  TotalHectaresResponse,
} from './dashboard.types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getTotalFarms(): Promise<TotalFarmsResponse> {
    try {
      this.logger.log('Fetching total number of farms');
      const totalFarms = await this.prisma.farm.count();
      this.logger.log(`Total farms: ${totalFarms}`);
      return { totalFarms };
    } catch (error) {
      this.logger.error('Error fetching total farms', error.stack);
      throw error;
    }
  }

  async getTotalHectares(): Promise<TotalHectaresResponse> {
    try {
      this.logger.log('Fetching total hectares');
      const result = await this.prisma.farm.aggregate({
        _sum: {
          total_area: true,
        },
      });
      this.logger.log(
        `Total hectares: ${result._sum.total_area?.toNumber() || 0}`,
      );
      return { totalHectares: result._sum.total_area || 0 };
    } catch (error) {
      this.logger.error('Error fetching total hectares', error.stack);
      throw error;
    }
  }

  async getFarmsByState(): Promise<FarmsByStateResponse[]> {
    try {
      this.logger.log('Fetching farms by state');
      const farmsByState = await this.prisma.farm.groupBy({
        by: ['state'],
        _count: {
          id: true,
        },
      });
      this.logger.log(`Found farms by state: ${farmsByState.length}`);
      return farmsByState.map((state) => ({
        state: state.state,
        farmCount: state._count.id,
      }));
    } catch (error) {
      this.logger.error('Error fetching farms by state', error.stack);
      throw error;
    }
  }

  async getCropsByType(): Promise<CropsByTypeResponse[]> {
    try {
      this.logger.log('Fetching crops by type');
      const cropsByType = await this.prisma.plantedCrop.groupBy({
        by: ['name'],
        _count: {
          id: true,
        },
      });
      this.logger.log(`Found crops by type: ${cropsByType.length}`);
      return cropsByType.map((crop) => ({
        crop: crop.name,
        plantedCount: crop._count.id,
      }));
    } catch (error) {
      this.logger.error('Error fetching crops by type', error.stack);
      throw error;
    }
  }

  async getLandUse(): Promise<LandUseResponse> {
    try {
      this.logger.log('Fetching land use data');
      const result = await this.prisma.farm.aggregate({
        _sum: {
          arable_area: true,
          vegetation_area: true,
        },
      });
      this.logger.log('Land use data fetched successfully');
      return {
        arableArea: result._sum.arable_area || 0,
        vegetationArea: result._sum.vegetation_area || 0,
      };
    } catch (error) {
      this.logger.error('Error fetching land use data', error.stack);
      throw error;
    }
  }
}
