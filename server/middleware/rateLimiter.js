// const rateLimit = require("express-rate-limit");
// const { RedisStore } = require("rate-limit-redis");
const { RedisStore } = require("rate-limit-redis");
const rateLimit = require("express-rate-limit");

//prevent brute force attacks
// Rate limiting middleware
const createRateLimiter = (redisClient) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
      prefix: "rate-limit:",
    }),
    windowMs: 90 * 1000, // 15 minutes
    max: 150, // 5 requests per window
    message: "Too many requests from this IP",
  });
};

module.exports = createRateLimiter;
