"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeRateLimit = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 100,
    duration: 60,
});
const consumeRateLimit = async (key) => {
    try {
        await rateLimiter.consume(key);
    }
    catch (error) {
        throw new Error('Rate limit exceeded. Please try again later.');
    }
};
exports.consumeRateLimit = consumeRateLimit;
