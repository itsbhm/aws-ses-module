import { z } from 'zod';

// Define Zod schema for validating the email input fields
const emailValidationSchema = z.object({
  to: z.array(z.string().email()),  // 'to' must be an array of valid email strings
  cc: z.array(z.string().email()).optional(),  // 'cc' is optional, but if provided, it must be an array of valid email strings
  bcc: z.array(z.string().email()).optional(),  // 'bcc' is optional, but if provided, it must be an array of valid email strings
  subject: z.string().min(1, { message: "Subject must be a non-empty string." }),  // 'subject' must be a non-empty string
  body: z.string().min(1, { message: "Body must be a non-empty string." }),  // 'body' must be a non-empty string
});

// Type for the input based on the Zod schema
type EmailValidationInput = z.infer<typeof emailValidationSchema>;

// Validate email input fields using Zod
export const validateEmailInput = ({
  to,
  cc,
  bcc,
  subject,
  body,
}: EmailValidationInput): void => {
  try {
    // Zod will validate the input and throw an error if the validation fails
    emailValidationSchema.parse({ to, cc, bcc, subject, body });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handling Zod validation errors
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;  // If it's not a ZodError, rethrow it
  }
};
