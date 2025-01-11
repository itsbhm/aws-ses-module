### Testing Beta Version Installation

To verify:
1. Install the beta version:
   ```bash
   npm install aws-ses-module@beta
   ```

2. Test the module in a project:
   ```javascript
   const { sendEmail } = require('aws-ses-module');

   (async () => {
     try {
       const result = await sendEmail({
         to: ['test@example.com'],
         subject: 'Beta Test Email',
         body: '<p>This is a test email from aws-ses-module beta.</p>',
         isHtml: true,
       });
       console.log('Email sent successfully:', result);
     } catch (error) {
       console.error('Error sending email:', error);
     }
   })();
   ```