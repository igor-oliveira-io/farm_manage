import { z } from 'zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const CreateFarmerSchema = z.object({
  document: z
    .string()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    .refine((value) => cpf.isValid(value) || cnpj.isValid(value), {
      message: 'Invalid document. It must be a valid CPF or CNPJ.',
    }),
  document_type: z.enum(['CPF', 'CNPJ']),
  name: z.string().min(3, 'Name must be at least 3 characters long'),
});

export const UpdateFarmerSchema = CreateFarmerSchema.partial();
