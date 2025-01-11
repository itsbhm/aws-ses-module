# AWS SES Email Module with Rate Limiting

A powerful and easy-to-use Node.js module for sending emails using **AWS SES** (Simple Email Service). This package supports sending emails to `to`, `cc`, and `bcc` recipients, HTML email bodies, and includes built-in **rate limiting** to ensure your email sending stays within AWS SES quota limits.

## Key Features of AWS SES Email Module with Rate Limiting

- **AWS SES Integration**: Seamlessly send emails via AWS SES with minimal configuration.
- **Built-in Rate Limiting**: Prevent exceeding your SES sending limits by rate-limiting email sends (10 emails per minute by default).
- **Email Input Validation**: Ensure that email inputs such as recipients, subject, and body are correctly formatted using **Zod** schema validation.
- **HTML and Plain Text Email Support**: Send both **HTML** and **plain-text** emails with customizable subjects and bodies.
- **Error Handling**: Detailed error messages to help diagnose and fix issues during email sending.
- **Easy Configuration with Environment Variables**: Configure your AWS credentials and SES settings through environment variables.

## Installation

To get started with the AWS SES Email Module, install it via npm:

```bash
npm install aws-ses-module
```

## Configuration Guide

### Step 1: Set Up Your AWS SES Credentials

To use AWS SES, you'll need to have an AWS account with SES configured. Set up a `.env` file in the root of your project with the following AWS credentials and SES configurations:

```ini
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region
SENDER_EMAIL=your-sender-email@example.com
```

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_REGION`: The AWS region where your SES service is configured (e.g., `us-east-1`).
- `SENDER_EMAIL`: A verified sender email address with SES (this will be the "From" address for all outgoing emails).

### Step 2: TypeScript Setup

This module is written in TypeScript. Ensure that your project is set up to compile TypeScript files. If needed, install TypeScript and related packages:

```bash
npm install --save-dev typescript ts-node tsconfig-paths
```

Create a `tsconfig.json` file if it doesn't already exist in your project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "index.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 3: Send an Email

Once the setup is complete, you can send emails using the `sendEmail` function.

#### Example Usage (app.ts)

```typescript
import { sendEmail } from 'aws-ses-module';

(async () => {
  try {
    const response = await sendEmail({
      to: ['recipient@domain.com'],
      subject: 'Hello from AWS SES',
      body: '<h1>This is a test email</h1>',
      isHtml: true, // Set to false if sending plain-text email
    });
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error instanceof Error ? error.message : 'Unknown error');
  }
})();
```

### Parameters for Sending Email

- **to** (`string[]`): Array of recipient email addresses.
- **cc** (`string[]`, optional): Array of CC recipients (optional).
- **bcc** (`string[]`, optional): Array of BCC recipients (optional).
- **subject** (`string`): Subject of the email.
- **body** (`string`): Body of the email.
- **isHtml** (`boolean`, optional): Whether the email body is HTML (`true`) or plain text (`false`).
- **attachments** (`any[]`, optional): Array of attachments (future support for AWS SES API-based attachment handling).

## Rate Limiting

The AWS SES Email Module comes with built-in rate limiting to ensure you don’t exceed your SES sending quota. By default, the module is configured to allow up to **10 emails per minute** (configurable).

### How Rate Limiting Works

- Each email send request consumes one rate limit point.
- The rate limiter allows up to 10 emails per minute.
- If the rate limit is exceeded, an error is thrown: `"Rate limit exceeded. Please try again later."`

The rate limiter uses the **`rate-limiter-flexible`** library to enforce this rule.

## Error Handling

The module uses try-catch blocks to handle errors effectively:

- **Validation Errors**: If the email input doesn’t meet the required format (e.g., invalid email address, empty subject, etc.), it throws a validation error with detailed messages.
- **Rate Limit Errors**: If the rate limit is exceeded, the error message will be `"Rate limit exceeded. Please try again later."`
- **AWS SES Errors**: Any errors from AWS SES are logged and thrown for easy troubleshooting.

## Example Environment Setup

Here’s an example of what your `.env` file should look like:

```ini
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
SENDER_EMAIL=your-sender-email@example.com
```

## Running the Application

You can run your application using `ts-node`, which allows you to run TypeScript files directly without needing to compile them first.

### Run the Example with `npx`

To run the example `app.ts`, use the following command:

```bash
npx ts-node -r tsconfig-paths/register app.ts
```

This command does the following:

- `npx ts-node`: Runs the TypeScript file using `ts-node`.
- `-r tsconfig-paths/register`: Ensures that your TypeScript path aliases (like `@/*`) are resolved correctly using `tsconfig-paths`.
- `app.ts`: The TypeScript file containing the code to send emails.

## Dependencies and Dev Dependencies

### Dependencies

- **`@aws-sdk/client-ses`**: The official AWS SDK for interacting with the SES (Simple Email Service) API to send emails.
- **`rate-limiter-flexible`**: A powerful rate-limiting library for implementing rate limits like the 10 emails per minute in this module.
- **`dotenv`**: A module for loading environment variables from a `.env` file.
- **`zod`**: A TypeScript-first schema validation library used to validate email input fields (recipients, subject, body).

### Dev Dependencies

- **`typescript`**: TypeScript is used to write the module in a statically typed manner, improving reliability and maintainability.
- **`ts-node`**: A tool for running TypeScript code directly without needing to compile it first.
- **`tsconfig-paths`**: A package to support custom path mappings in the TypeScript configuration.
- **`@types/node`**: Provides type definitions for Node.js to improve development experience and type-checking.

```json
"dependencies": {
  "@aws-sdk/client-ses": "^3.726.1",
  "dotenv": "^16.0.3",
  "rate-limiter-flexible": "^5.0.4",
  "zod": "^3.24.1"
},
"devDependencies": {
  "typescript": "^5.2.0",
  "ts-node": "^10.9.2",
  "tsconfig-paths": "^4.2.0",
  "@types/node": "^18.11.9"
}
```

## Contributing

Contributions to the module are welcome! To contribute, please fork the repository, make your changes, and submit a pull request.

### How to Contribute

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## License

**Author**: [Shubham Vishwakarma](https://github.com/itsbhm)  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.