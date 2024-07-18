/* eslint-disable import/no-extraneous-dependencies */

const rateLimiter = require("express-rate-limit");

module.exports = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later.",
  },
});
