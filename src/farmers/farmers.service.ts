/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from '@prisma/client';

@Injectable()
export class FarmersService {
  private readonly logger = new Logger(FarmersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    try {
      this.logger.log('Creating a new farmer');
      const farmer = await this.prisma.farmer.create({
        data: createFarmerDto,
      });
      this.logger.log(`Farmer with ID ${farmer.id} created successfully`);
      return farmer;
    } catch (error) {
      this.logger.error('Error creating farmer', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Farmer[]> {
    try {
      this.logger.log('Fetching all farmers');
      const farmers = await this.prisma.farmer.findMany({
        include: {
          farms: true,
        },
      });
      this.logger.log(`Found ${farmers.length} farmers`);
      return farmers;
    } catch (error) {
      this.logger.error('Error fetching farmers', error.stack);
      throw error;
    }
  }

  async findOne(id: number): Promise<Farmer> {
    try {
      this.logger.log(`Fetching farmer with ID ${id}`);
      const farmer = await this.prisma.farmer.findUnique({
        where: { id },
        include: {
          farms: true,
        },
      });

      if (!farmer) {
        this.logger.warn(`Farmer with ID ${id} not found`);
        throw new NotFoundException(`Farmer with ID ${id} not found`);
      }

      this.logger.log(`Found farmer with ID ${id}`);
      return farmer;
    } catch (error) {
      this.logger.error(`Error fetching farmer with ID ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    try {
      this.logger.log(`Updating farmer with ID ${id}`);
      const farmer = await this.prisma.farmer.update({
        where: { id },
        data: updateFarmerDto,
      });

      this.logger.log(`Farmer with ID ${id} updated successfully`);
      return farmer;
    } catch (error) {
      this.logger.error(`Error updating farmer with ID ${id}`, error.stack);
      if (error instanceof NotFoundException) {
        this.logger.warn(`Farmer with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Farmer> {
    try {
      this.logger.log(`Removing farmer with ID ${id}`);
      const farmer = await this.prisma.farmer.delete({
        where: { id },
      });

      this.logger.log(`Farmer with ID ${id} removed successfully`);
      return farmer;
    } catch (error) {
      this.logger.error(`Error removing farmer with ID ${id}`, error.stack);
      throw error;
    }
  }
}
