import { z } from 'zod';

export const CreateFarmSchema = z
  .object({
    farmer_id: z.number().int().positive(),
    name: z.string().min(3).max(100),
    city: z.string().min(3).max(100),
    state: z.string().min(2).max(100),
    total_area: z.number().positive(),
    arable_area: z.number().positive(),
    vegetation_area: z.number().positive(),
  })
  .refine(
    (data) => data.arable_area + data.vegetation_area <= data.total_area,
    {
      message:
        'The sum of arable area and vegetation area cannot exceed the total area.',
      path: ['arable_area', 'vegetation_area'],
    },
  );

export const UpdateFarmSchema = z
  .object({
    farmer_id: z.number().int().positive().optional(),
    name: z.string().min(3).max(100).optional(),
    city: z.string().min(3).max(100).optional(),
    state: z.string().min(2).max(100).optional(),
    total_area: z.number().positive().optional(),
    arable_area: z.number().positive().optional(),
    vegetation_area: z.number().positive().optional(),
  })
  .refine(
    (data) => {
      if (
        data.arable_area !== undefined &&
        data.vegetation_area !== undefined &&
        data.total_area !== undefined
      ) {
        return data.arable_area + data.vegetation_area <= data.total_area;
      }
      return true;
    },
    {
      message:
        'The sum of arable area and vegetation area cannot exceed the total area.',
      path: ['arable_area', 'vegetation_area'],
    },
  );
