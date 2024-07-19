/* eslint-disable no-console */

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { errors } = require("celebrate");

const { globalErrorHandler } = require("./middlewares/error");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const rateLimiter = require("./middlewares/limiter");

const { DB_ADDRESS } = require("./utils/config");

require("dotenv").config();

const { PORT = 3001 } = process.env;

const app = express();

// address is harcoded, pass in .env file
mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

const routes = require("./routes");

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use(rateLimiter);

app.use(routes, require("./routes/index"));

app.use(errorLogger);

app.use(errors());

app.use(globalErrorHandler);

app.listen(PORT, () => {});
