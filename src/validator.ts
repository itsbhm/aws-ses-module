import { z } from 'zod';
import { EmailParams } from './types';

const emailValidationSchema = z.object({
  to: z.array(z.string().email()),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  subject: z.string().min(1, { message: "Subject must be a non-empty string." }),
  body: z.string().min(1, { message: "Body must be a non-empty string." }),
});

export const validateEmailInput = (params: EmailParams): void => {
  try {
    emailValidationSchema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
};

