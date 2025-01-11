const validator = require('validator');

const validateEmailInput = ({ to, cc, bcc, subject, body }) => {
  if (!to || !Array.isArray(to) || to.length === 0 || !to.every(validator.isEmail)) {
    throw new Error('"to" field must be a non-empty array of valid email addresses.');
  }

  if (cc && (!Array.isArray(cc) || !cc.every(validator.isEmail))) {
    throw new Error('"cc" field must be an array of valid email addresses.');
  }

  if (bcc && (!Array.isArray(bcc) || !bcc.every(validator.isEmail))) {
    throw new Error('"bcc" field must be an array of valid email addresses.');
  }

  if (!subject || typeof subject !== 'string') {
    throw new Error('Invalid subject. It must be a non-empty string.');
  }

  if (!body || typeof body !== 'string') {
    throw new Error('Invalid body. It must be a non-empty string.');
  }
};

module.exports = { validateEmailInput };
