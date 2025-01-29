/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { FarmersService } from './farmers.service';
import { PrismaService } from '../prisma.service';

describe('FarmersService', () => {
  let service: FarmersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const prismaMock = {
      farmer: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<FarmersService>(FarmersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a farmer successfully', async () => {
    const createFarmerDto = {
      name: 'Fazendeiro 1',
      document: '12345678910',
      document_type: 'CPF',
    };

    const expectedResponse = {
      id: 1,
      ...createFarmerDto,
    };

    jest.spyOn(prisma.farmer, 'create').mockResolvedValue(expectedResponse);

    const result = await service.create(createFarmerDto);

    expect(result).toEqual(expectedResponse);
    expect(prisma.farmer.create).toHaveBeenCalledWith({
      data: createFarmerDto,
    });
  });

  it('should throw an error when creating a farmer fails', async () => {
    const createFarmerDto = {
      name: 'Fazendeiro 1',
      document: '12345678910',
      document_type: 'CPF',
    };

    jest
      .spyOn(prisma.farmer, 'create')
      .mockRejectedValue(new Error('Database error'));

    await expect(service.create(createFarmerDto)).rejects.toThrow(
      'Database error',
    );
    expect(prisma.farmer.create).toHaveBeenCalledWith({
      data: createFarmerDto,
    });
  });

  it('should return a farmer by ID', async () => {
    const expectedFarmer = {
      id: 1,
      name: 'Fazendeiro 1',
      document: '12345678910',
      document_type: 'CPF',
    };
    jest.spyOn(prisma.farmer, 'findUnique').mockResolvedValue(expectedFarmer);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedFarmer);
    expect(prisma.farmer.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { farms: true },
    });
  });

  it('should throw an error if farmer is not found', async () => {
    jest.spyOn(prisma.farmer, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(
      'Farmer with ID 999 not found',
    );
  });

  it('should return a list of farmers', async () => {
    const farmers = [
      {
        id: 1,
        name: 'Fazendeiro 1',
        document: '12345678910',
        document_type: 'CPF',
      },
      {
        id: 2,
        name: 'Fazendeiro 2',
        document: '12345678911',
        document_type: 'CPF',
      },
    ];

    jest.spyOn(prisma.farmer, 'findMany').mockResolvedValue(farmers);

    const result = await service.findAll();

    expect(result).toEqual(farmers);
    expect(prisma.farmer.findMany).toHaveBeenCalled();
  });

  it('should update a farmer successfully', async () => {
    const updateDto = {
      id: 2,
      name: 'Fazendeiro 2',
      document: '12345678911',
      document_type: 'CPF',
    };
    const updatedFarmer = {
      id: 2,
      name: 'Fazendeiro 2',
      document: '12345678911',
      document_type: 'CPF',
    };

    jest.spyOn(prisma.farmer, 'update').mockResolvedValue(updatedFarmer);

    const result = await service.update(1, updateDto);

    expect(result).toEqual(updatedFarmer);
    expect(prisma.farmer.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  it('should throw an error if update fails', async () => {
    jest
      .spyOn(prisma.farmer, 'update')
      .mockRejectedValue(new Error('Update failed'));

    await expect(service.update(1, { name: 'Novo Nome' })).rejects.toThrow(
      'Update failed',
    );
  });

  it('should delete a farmer successfully', async () => {
    jest.spyOn(prisma.farmer, 'delete').mockResolvedValue({
      id: 1,
      name: 'Fazendeiro 1',
      document: '12345678910',
      document_type: 'CPF',
    });

    const result = await service.remove(1);

    expect(result).toEqual({
      id: 1,
      name: 'Fazendeiro 1',
      document: '12345678910',
      document_type: 'CPF',
    });
    expect(prisma.farmer.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw an error if deletion fails', async () => {
    jest
      .spyOn(prisma.farmer, 'delete')
      .mockRejectedValue(new Error('Delete failed'));

    await expect(service.remove(1)).rejects.toThrow('Delete failed');
  });
});
