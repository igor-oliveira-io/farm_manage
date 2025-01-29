/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePlantedCropDto } from './dto/create-planted_crop.dto';
import { UpdatePlantedCropDto } from './dto/update-planted_crop.dto';
import { PlantedCrop } from '@prisma/client';

@Injectable()
export class PlantedCropsService {
  private readonly logger = new Logger(PlantedCropsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPlantedCropDto: CreatePlantedCropDto,
  ): Promise<PlantedCrop> {
    try {
      this.logger.log('Creating a new planted crop');
      const crop = await this.prisma.plantedCrop.create({
        data: createPlantedCropDto,
      });
      this.logger.log(`Planted crop with ID ${crop.id} created successfully`);
      return crop;
    } catch (error) {
      this.logger.error('Error creating planted crop', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<PlantedCrop[]> {
    try {
      this.logger.log('Fetching all planted crops');
      const crops = await this.prisma.plantedCrop.findMany({
        include: {
          harvest: true,
        },
      });
      this.logger.log(`Found ${crops.length} planted crops`);
      return crops;
    } catch (error) {
      this.logger.error('Error fetching planted crops', error.stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<PlantedCrop> {
    try {
      this.logger.log(`Fetching planted crop with ID ${id}`);
      const crop = await this.prisma.plantedCrop.findUnique({
        where: { id },
        include: {
          harvest: true,
        },
      });
      if (!crop) {
        this.logger.warn(`Planted crop with ID ${id} not found`);
        throw new NotFoundException(`PlantedCrop with ID "${id}" not found`);
      }
      this.logger.log(`Found planted crop with ID ${id}`);
      return crop;
    } catch (error) {
      this.logger.error(
        `Error fetching planted crop with ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(
    id: string,
    updatePlantedCropDto: UpdatePlantedCropDto,
  ): Promise<PlantedCrop> {
    try {
      this.logger.log(`Updating planted crop with ID ${id}`);
      const crop = await this.prisma.plantedCrop.update({
        where: { id },
        data: updatePlantedCropDto,
      });
      this.logger.log(`Planted crop with ID ${id} updated successfully`);
      return crop;
    } catch (error) {
      this.logger.error(
        `Error updating planted crop with ID ${id}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        this.logger.warn(`Planted crop with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<PlantedCrop> {
    try {
      this.logger.log(`Removing planted crop with ID ${id}`);
      const crop = await this.prisma.plantedCrop.delete({
        where: { id },
      });
      this.logger.log(`Planted crop with ID ${id} removed successfully`);
      return crop;
    } catch (error) {
      this.logger.error(
        `Error removing planted crop with ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
