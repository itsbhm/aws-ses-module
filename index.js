require('dotenv').config();
const { sendEmail } = require('./src/emailService');

module.exports = { sendEmail };
