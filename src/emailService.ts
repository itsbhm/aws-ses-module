import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';
import { validateEmailInput } from './validator';
import { consumeRateLimit } from './rateLimiter';
import { EmailParams, EmailResult } from './types';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const sendEmail = async ({
  to,
  cc = [],
  bcc = [],
  subject,
  body,
  isHtml = true,
}: EmailParams): Promise<EmailResult> => {
  try {
    validateEmailInput({ to, cc, bcc, subject, body });
    await consumeRateLimit('email-send');

    const params: SendEmailCommandInput = {
      Destination: { ToAddresses: to, CcAddresses: cc, BccAddresses: bcc },
      Message: {
        Body: isHtml
          ? { Html: { Charset: 'UTF-8', Data: body } }
          : { Text: { Charset: 'UTF-8', Data: body } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: process.env.SENDER_EMAIL as string,
    };

    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
};

