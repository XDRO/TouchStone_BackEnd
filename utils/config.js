const { NODE_ENV } = process.env;

const { JWT_SECRET = "default" } = process.env;

const { DB_ADDRESS = "mongodb://127.0.0.1:27017/Touch_Stone" } = process.env;

module.exports = { JWT_SECRET, NODE_ENV, DB_ADDRESS };
