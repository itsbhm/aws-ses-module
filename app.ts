import { sendEmail } from './index';

(async () => {
  try {
    const response = await sendEmail({
      to: ['employee@domain.com'],
      // cc: ['manager@domain.com'],
      // bcc: ['teamhead@domain.com'],
      subject: 'Hello World',
      body: '<h1>This is a test email</h1>',
      isHtml: true,
    });
    console.log('Email sent successfully:', response);
  } catch (error) {
    // Check if error is an instance of the Error object
    if (error instanceof Error) {
      console.error('Failed to send email:', error.message);
    } else {
      // If it's not an instance of Error, log a generic error message
      console.error('Failed to send email: Unknown error', error);
    }
  }
})();
