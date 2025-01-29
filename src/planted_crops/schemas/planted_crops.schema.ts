import { z } from 'zod';

export const CreatePlantedCropSchema = z.object({
  name: z.string().min(3).max(50),
  harvest_id: z.number().positive(),
  production: z.number().positive(),
});

export const UpdatePlantedCropSchema = CreatePlantedCropSchema.partial();
