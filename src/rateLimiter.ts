import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export const consumeRateLimit = async (key: string): Promise<void> => {
  try {
    await rateLimiter.consume(key);
  } catch (error) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
};

