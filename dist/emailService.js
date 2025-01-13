"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const validator_1 = require("./validator");
const rateLimiter_1 = require("./rateLimiter");
const sesClient = new client_ses_1.SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const sendEmail = async ({ to, cc = [], bcc = [], subject, body, isHtml = true, }) => {
    try {
        (0, validator_1.validateEmailInput)({ to, cc, bcc, subject, body });
        await (0, rateLimiter_1.consumeRateLimit)('email-send');
        const params = {
            Destination: { ToAddresses: to, CcAddresses: cc, BccAddresses: bcc },
            Message: {
                Body: isHtml
                    ? { Html: { Charset: 'UTF-8', Data: body } }
                    : { Text: { Charset: 'UTF-8', Data: body } },
                Subject: { Charset: 'UTF-8', Data: subject },
            },
            Source: process.env.SENDER_EMAIL,
        };
        const command = new client_ses_1.SendEmailCommand(params);
        const result = await sesClient.send(command);
        return { success: true, result };
    }
    catch (error) {
        console.error('Error sending email:', error.message);
        return { success: false, error: error.message };
    }
};
exports.sendEmail = sendEmail;
