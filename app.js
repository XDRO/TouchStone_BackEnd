/* eslint-disable no-console */
const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const { globalErrorHandler } = require("./middlewares/error");

// const { requestLogger, errorLogger } = require("./middlewares/logger");

// require("dotenv").config();

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Touch_Stone", {
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

app.use(routes, require("./routes/index"));

app.use(globalErrorHandler);

app.listen(PORT, () => {});
