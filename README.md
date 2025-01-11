# aws-ses-module

A developer-friendly Node.js module for sending emails using AWS SES (Simple Email Service). Supports `to`, `cc`, `bcc`, HTML/plain text emails, input validation, and rate limiting out of the box.

---

## Features

- **AWS SES Integration**: Easily send emails using AWS SES with minimal configuration.
- **Multiple Recipients**: Supports `to`, `cc`, and `bcc` fields with multiple recipients.
- **HTML and Plain Text Emails**: Send emails in HTML or plain text formats.
- **Rate Limiting**: Prevent abuse by setting limits on the number of emails sent per minute.
- **Input Validation**: Validates email addresses and other parameters to ensure reliability.
- **Developer-Friendly**: Easy to integrate and highly configurable for your project needs.

---

## Installation

Install the module via NPM:

```bash
npm install aws-ses-module
```

---

## Configuration

The module requires AWS credentials and configuration. Create a `.env` file in your project root and define the following:

```env
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
SENDER_EMAIL=your-sender-email@example.com
```

- **AWS_ACCESS_KEY_ID**: Your AWS access key.
- **AWS_SECRET_ACCESS_KEY**: Your AWS secret access key.
- **AWS_REGION**: The AWS region (e.g., `us-east-1`).
- **SENDER_EMAIL**: The verified sender email address in AWS SES.

---

## Usage

Here’s how you can send an email using the `aws-ses-module`:

### Basic Example:

```javascript
const { sendEmail } = require('aws-ses-module');

(async () => {
  try {
    const result = await sendEmail({
      to: ['recipient@example.com'],
      cc: ['cc-recipient@example.com'],
      bcc: ['bcc-recipient@example.com'],
      subject: 'Hello from AWS SES',
      body: '<p>This is a test email sent using aws-ses-module.</p>',
      isHtml: true,
    });

    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
})();
```

### Plain Text Email Example:

```javascript
const { sendEmail } = require('aws-ses-module');

(async () => {
  try {
    const result = await sendEmail({
      to: ['recipient@example.com'],
      subject: 'Plain Text Email',
      body: 'This is a plain text email.',
      isHtml: false, // Set to false for plain text emails
    });

    console.log('Plain text email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send plain text email:', error);
  }
})();
```

---

## API Reference

### `sendEmail(options)`

#### Parameters:

| Parameter  | Type           | Required | Description                                                                                   |
|------------|----------------|----------|-----------------------------------------------------------------------------------------------|
| `to`       | `Array<String>`| Yes      | List of recipient email addresses.                                                           |
| `cc`       | `Array<String>`| No       | List of CC recipient email addresses.                                                        |
| `bcc`      | `Array<String>`| No       | List of BCC recipient email addresses.                                                       |
| `subject`  | `String`       | Yes      | The subject of the email.                                                                    |
| `body`     | `String`       | Yes      | The email content. Pass HTML or plain text based on the `isHtml` flag.                       |
| `isHtml`   | `Boolean`      | Yes      | Set `true` for HTML emails and `false` for plain text emails.                                |

#### Returns:

- Resolves to an object containing:
  ```javascript
  {
    success: true,
    result: {
      MessageId: '1234567890'
    }
  }
  ```
- Rejects with an error if something goes wrong.

---

## Advanced Features

### Rate Limiting

By default, the module enforces a rate limit of **10 emails per minute**. This is configurable by modifying the `rateLimiter` settings in the module's source code (`src/rateLimiter.js`).

If you attempt to send emails faster than the limit, the module will throw a `RateLimitExceeded` error.

---

## Error Handling

Errors are thrown as JavaScript exceptions, so you can catch and handle them appropriately. Common errors include:

- **Validation Errors**:
  ```javascript
  Error: "to" field must be a non-empty array of valid email addresses.
  ```
- **AWS SES Errors**:
  These are returned directly from AWS SES, such as invalid credentials or unverified email addresses.

---

## Testing

This module comes with Jest tests. To run the test suite:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the tests:
   ```bash
   npm test
   ```

### Example Output:

```bash
PASS  test/emailService.test.js
  sendEmail
    ✓ should send an email successfully
    ✓ should validate input and throw an error for invalid "to" email
    ✓ should enforce rate limiting
    ✓ should support plain text email

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes and submit a pull request.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Author

Developed by [Shubham Vishwakarma](https://github.com/itsbhm).

For queries or issues, feel free to raise an issue on the [GitHub repository](https://github.com/itsbhm/aws-ses-module/issues).