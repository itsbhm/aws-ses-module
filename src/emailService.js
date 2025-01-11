const AWS = require('aws-sdk');
const { validateEmailInput } = require('./validator');
const { rateLimiter } = require('./rateLimiter');

// Load AWS credentials from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES();

const sendEmail = async ({ to, cc, bcc, subject, body, isHtml = true, attachments = [] }) => {
  try {
    // Validate email inputs
    validateEmailInput({ to, cc, bcc, subject, body });

    // Enforce rate-limiting
    await rateLimiter.consume('email-send');

    // Prepare email parameters
    const params = {
      Destination: {
        ToAddresses: to || [],
        CcAddresses: cc || [],
        BccAddresses: bcc || [],
      },
      Message: {
        Body: isHtml
          ? { Html: { Charset: 'UTF-8', Data: body } }
          : { Text: { Charset: 'UTF-8', Data: body } },
        Subject: { Charset: 'UTF-8', Data: subject },
      },
      Source: process.env.SENDER_EMAIL,
    };

    // Handle attachments if provided (convert to MIME format)
    if (attachments.length > 0) {
      throw new Error('Attachments are not supported yet.');
    }

    // Send email using SES
    const result = await ses.sendEmail(params).promise();
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

module.exports = { sendEmail };
