require('dotenv').config();
const AWS = require('aws-sdk');
const { sendEmail } = require('../src/emailService');

// Mock AWS SES
jest.mock('aws-sdk', () => {
  const sendEmailMock = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({ MessageId: '1234567890' }),
  });
  const SES = jest.fn(() => ({
    sendEmail: sendEmailMock,
  }));
  return { SES };
});

describe('sendEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send an email successfully', async () => {
    const result = await sendEmail({
      to: ['test@example.com'],
      subject: 'Test Email',
      body: '<p>Test Body</p>',
      isHtml: true,
    });

    expect(result).toHaveProperty('success', true);
    expect(result.result).toHaveProperty('MessageId', '1234567890');
    expect(AWS.SES).toHaveBeenCalledTimes(1);
    expect(AWS.SES().sendEmail).toHaveBeenCalledTimes(1);
  });

  test('should validate input and throw an error for invalid "to" email', async () => {
    await expect(
      sendEmail({
        to: ['invalid-email'],
        subject: 'Invalid Email Test',
        body: 'This should fail',
        isHtml: false,
      })
    ).rejects.toThrow('"to" field must be a non-empty array of valid email addresses.');
  });

  test('should enforce rate limiting', async () => {
    const rateLimiter = require('../src/rateLimiter');
    jest.spyOn(rateLimiter, 'rateLimiter').mockImplementationOnce({
      consume: jest.fn().mockRejectedValue(new Error('Rate limit exceeded')),
    });

    await expect(
      sendEmail({
        to: ['test@example.com'],
        subject: 'Rate Limiting Test',
        body: 'Rate limiting should apply',
        isHtml: true,
      })
    ).rejects.toThrow('Rate limit exceeded');

    expect(AWS.SES().sendEmail).not.toHaveBeenCalled();
  });

  test('should support plain text email', async () => {
    await sendEmail({
      to: ['test@example.com'],
      subject: 'Plain Text Email Test',
      body: 'This is a plain text email.',
      isHtml: false,
    });

    expect(AWS.SES().sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        Message: {
          Body: {
            Text: { Charset: 'UTF-8', Data: 'This is a plain text email.' },
          },
          Subject: { Charset: 'UTF-8', Data: 'Plain Text Email Test' },
        },
      })
    );
  });
});
