import * as path from 'path';
import * as dotenv from 'dotenv';

// Dynamically load the `.env` file from the user's project root
const userProjectPath: string = process.cwd();  // `process.cwd()` returns a string
const envPath: string = path.join(userProjectPath, '.env');  // `path.join()` returns a string
dotenv.config({ path: envPath });  // dotenv config expects an object with path as string

// Exporting the email service for external use
export { sendEmail } from '@/emailService';
