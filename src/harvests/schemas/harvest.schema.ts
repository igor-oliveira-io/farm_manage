import { z } from 'zod';

const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export const CreateHarvestSchema = z.object({
  year: z.string().refine((val) => iso8601Regex.test(val), {
    message:
      'Invalid date format. Please use ISO 8601 (ex: 2025-01-01T00:00:00Z)',
  }),
  farm_id: z.number().positive(),
});

export const UpdateHarvestSchema = CreateHarvestSchema.partial();
