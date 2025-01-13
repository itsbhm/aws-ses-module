# AWS SES Email Module with Rate Limiting

A powerful and easy-to-use Node.js module for sending emails using **AWS SES** (Simple Email Service). This package supports sending emails to `to`, `cc`, and `bcc` recipients, HTML email bodies, and includes built-in **rate limiting** to ensure your email sending stays within AWS SES quota limits.

## Key Features of AWS SES Email Module with Rate Limiting

- **AWS SES Integration**: Seamlessly send emails via AWS SES with minimal configuration.
- **Built-in Rate Limiting**: Prevent exceeding your SES sending limits by rate-limiting email sends (10 emails per minute by default).
- **Email Input Validation**: Ensure that email inputs such as recipients, subject, and body are correctly formatted using **Zod** schema validation.
- **HTML and Plain Text Email Support**: Send both **HTML** and **plain-text** emails with customizable subjects and bodies.
- **Error Handling**: Detailed error messages to help diagnose and fix issues during email sending.
- **Easy Configuration with Environment Variables**: Configure your AWS credentials and SES settings through environment variables.

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