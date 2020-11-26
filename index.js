const express = require("express");
const pino = require("pino");
const expressPino = require("express-pino-logger");
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(expressLogger);

app.get("/", (req, res) => {
  logger.debug("Calling res.send");
  res.send("Hello world!");
});

app.listen(PORT, () => {
  logger.info("Server running on port %d", PORT);
});
