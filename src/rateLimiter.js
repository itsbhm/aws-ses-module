const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 10, // Max 10 emails
  duration: 60, // Per minute
});

module.exports = { rateLimiter };
