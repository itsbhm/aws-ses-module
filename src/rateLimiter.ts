import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configuration for rate-limiting
const rateLimiter = new RateLimiterMemory({
  points: 10, // Max 10 emails
  duration: 60, // Per minute
});

export const consumeRateLimit = async (key: string): Promise<void> => {
  try {
    await rateLimiter.consume(key); // Consume one point for the given key
  } catch (error) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
};
