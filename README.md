# AWS SES Module

A developer-friendly Node.js module for sending emails using **AWS Simple Email Service (SES)**. This module supports **to**, **cc**, **bcc**, **HTML emails**, and includes built-in **rate limiting**.

## Features

- **Send emails** with `to`, `cc`, and `bcc` recipients.
- Supports **HTML** and plain text emails.
- **Rate limiting** with configurable limits to prevent excessive requests.
- **Input validation** for email addresses, subject, and body using `zod`.
- Easy integration with **AWS SES** using the latest SDK.
- Written in **TypeScript** for type safety and scalability.

---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14 or later recommended).
- **AWS SES**: Configure and verify your domain and email addresses in the AWS SES console.
- **AWS Credentials**: Set up an AWS access key with permissions to use SES.

### Install the Module

```bash
npm install aws-ses-module
```

### Install `dotenv` (Optional)

If you are using environment variables, make sure to install and configure `dotenv`:

```bash
npm install dotenv
```

---

## Usage

### 1. Configure Environment Variables

Create a `.env` file in your project root and add the following:

```env
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
SENDER_EMAIL=your-sender-email@example.com
```

### 2. Import and Use the Module

```typescript
import 'dotenv/config'; // Ensure this is included to load .env variables
import { sendEmail } from 'aws-ses-module';

async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    const result = await sendEmail({
      to: [userEmail],
      subject: 'Welcome to Our Platform!',
      body: `
        <h1>Welcome, ${userName}!</h1>
        <p>We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
      `,
      isHtml: true,
    });

    if (result.success) {
      console.log(`Email sent successfully to ${userEmail}`);
    } else {
      console.error(`Failed to send email:`, result.error);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the function
sendWelcomeEmail('s3.itsbhm@gmail.com', 'Shubham Vishwakarma');
```

---

## API Reference

### `sendEmail(params: EmailParams): Promise<EmailResult>`

Send an email using AWS SES.

#### Parameters

- **`params`**: An object with the following fields:
  - `to` (`string[]`): Required. Array of recipient email addresses.
  - `cc` (`string[]`, optional): Array of CC email addresses.
  - `bcc` (`string[]`, optional): Array of BCC email addresses.
  - `subject` (`string`): Required. Subject of the email.
  - `body` (`string`): Required. Content of the email.
  - `isHtml` (`boolean`, optional): Defaults to `true`. Set to `false` to send plain text.

#### Returns

A promise that resolves to an `EmailResult` object:
```typescript
interface EmailResult {
  success: boolean;
  result?: any;
  error?: string;
}
```

### Example
```typescript
const emailParams = {
  to: ['recipient@example.com'],
  cc: ['cc@example.com'],
  subject: 'Hello!',
  body: '<h1>Hello World</h1>',
  isHtml: true,
};

const result = await sendEmail(emailParams);
console.log(result);
```

---

## Error Handling

If you encounter the error:

**`Resolved credential object is not valid`**, ensure you have:
1. Correctly loaded environment variables using `dotenv`.
2. Verified the AWS credentials in `.env` and the AWS console.

```bash
npm install dotenv
```

Add this line to the top of your file:
```javascript
import 'dotenv/config';
```

---

## Rate Limiting

This module uses the `rate-limiter-flexible` library to limit email-sending requests.

- **Configuration**: 100 requests per minute (default).
- **Error**: If the limit is exceeded, you will receive the following error:
  ```
  Rate limit exceeded. Please try again later.
  ```

You can modify the rate-limiting settings in the `rateLimiter.ts` file.

---

## Environment Validation

Environment variables are validated using `zod`. If any required variable is missing or invalid, the application will terminate with an error like:

```bash
Environment variable validation failed: [
  {
    "message": "Expected string, received undefined",
    "path": ["AWS_ACCESS_KEY_ID"]
  }
]
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## Troubleshooting

### Common Issues

1. **Email not sent**:
   - Ensure the `SENDER_EMAIL` is verified in AWS SES.
   - Verify the `to`, `cc`, and `bcc` addresses are either verified or in the same domain (if in sandbox mode).

2. **Environment variables not loaded**:
   - Ensure `dotenv` is installed and correctly configured.

3. **Rate limit errors**:
   - Lower the email frequency or adjust the rate-limiting configuration.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and submit a pull request.

---

## Feedback and Support

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/itsbhm/aws-ses-module/issues).

---

## Author

**Shubham Vishwakarma**  
[GitHub](https://github.com/itsbhm)
