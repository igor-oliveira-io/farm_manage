/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Harvest } from '@prisma/client';

@Injectable()
export class HarvestsService {
  private readonly logger = new Logger(HarvestsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    try {
      this.logger.log('Creating a new harvest');
      const harvest = await this.prisma.harvest.create({
        data: createHarvestDto,
      });
      this.logger.log(`Harvest with ID ${harvest.id} created successfully`);
      return harvest;
    } catch (error) {
      this.logger.error('Error creating harvest', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Harvest[]> {
    try {
      this.logger.log('Fetching all harvests');
      const harvests = await this.prisma.harvest.findMany({
        include: {
          farm: true,
          planted_crops: true,
        },
      });
      this.logger.log(`Found ${harvests.length} harvests`);
      return harvests;
    } catch (error) {
      this.logger.error('Error fetching harvests', error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<Harvest | null> {
    try {
      this.logger.log(`Fetching harvest with ID ${id}`);
      const harvest = await this.prisma.harvest.findUnique({
        where: { id },
        include: {
          farm: true,
          planted_crops: true,
        },
      });
      if (!harvest) {
        this.logger.warn(`Harvest with ID ${id} not found`);
        throw new NotFoundException(`Harvest with ID "${id}" not found`);
      }
      this.logger.log(`Found harvest with ID ${id}`);
      return harvest;
    } catch (error) {
      this.logger.error(`Error fetching harvest with ID ${id}`, error.stack);
      throw error;
    }
  }

  async update(
    id: number,
    updateHarvestDto: UpdateHarvestDto,
  ): Promise<Harvest> {
    try {
      this.logger.log(`Updating harvest with ID ${id}`);
      const harvest = await this.prisma.harvest.update({
        where: { id },
        data: updateHarvestDto,
      });
      this.logger.log(`Harvest with ID ${id} updated successfully`);
      return harvest;
    } catch (error) {
      this.logger.error(`Error updating harvest with ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        this.logger.warn(`Harvest with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Harvest> {
    try {
      this.logger.log(`Removing harvest with ID ${id}`);
      const harvest = await this.prisma.harvest.delete({
        where: { id },
      });
      this.logger.log(`Harvest with ID ${id} removed successfully`);
      return harvest;
    } catch (error) {
      this.logger.error(`Error removing harvest with ID ${id}`, error.stack);
      throw error;
    }
  }
}
