/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from '@prisma/client';

@Injectable()
export class FarmsService {
  private readonly logger = new Logger(FarmsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    try {
      this.logger.log('Creating a new farm');
      const farm = await this.prisma.farm.create({
        data: createFarmDto,
      });
      this.logger.log(`Farm with ID ${farm.id} created successfully`);
      return farm;
    } catch (error) {
      this.logger.error('Error creating farm', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Farm[]> {
    try {
      this.logger.log('Fetching all farms');
      const farms = await this.prisma.farm.findMany({
        include: {
          harvests: true,
        },
      });
      this.logger.log(`Found ${farms.length} farms`);
      return farms;
    } catch (error) {
      this.logger.error('Error fetching farms', error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<Farm | null> {
    try {
      this.logger.log(`Fetching farm with ID ${id}`);
      const farm = await this.prisma.farm.findUnique({
        where: { id },
        include: {
          harvests: true,
        },
      });
      if (!farm) {
        this.logger.warn(`Farm with ID ${id} not found`);
        throw new NotFoundException(`Farm with ID "${id}" not found`);
      }
      this.logger.log(`Found farm with ID ${id}`);
      return farm;
    } catch (error) {
      this.logger.error(`Error fetching farm with ID ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    try {
      this.logger.log(`Updating farm with ID ${id}`);
      const farm = await this.prisma.farm.update({
        where: { id },
        data: updateFarmDto,
      });
      this.logger.log(`Farm with ID ${id} updated successfully`);
      return farm;
    } catch (error) {
      this.logger.error(`Error updating farm with ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        this.logger.warn(`Farm with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Farm> {
    try {
      this.logger.log(`Removing farm with ID ${id}`);
      const farm = await this.prisma.farm.delete({
        where: { id },
      });
      this.logger.log(`Farm with ID ${id} removed successfully`);
      return farm;
    } catch (error) {
      this.logger.error(`Error removing farm with ID ${id}`, error.stack);
      throw error;
    }
  }
}
