import { EmailParams, EmailResult } from './types';
export declare const sendEmail: ({ to, cc, bcc, subject, body, isHtml, }: EmailParams) => Promise<EmailResult>;
