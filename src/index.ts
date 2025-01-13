import * as dotenv from 'dotenv';
import { z } from 'zod';
import { sendEmail } from './emailService';
import { EmailParams, EmailResult } from './types';

dotenv.config();

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  SENDER_EMAIL: z.string().email(),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Environment variable validation failed:', error.errors);
    process.exit(1);
  }
}

export { sendEmail, EmailParams, EmailResult };

