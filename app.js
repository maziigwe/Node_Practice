const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Logger = require("./middlewares/logger");
const authMiddleware = require("./authentication");
const courses = require("./routes/courses");
const home = require("./routes/home");
const Joi = require("joi");
const mongoose = require("mongoose");
const http = require("http");
const _ = require("underscore");
const express = require("express");
const logger = new Logger();
const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Third-party middlewares
app.use(helmet());
// Environments
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}
//Custom middlewares
app.use(authMiddleware);
app.use((req, res, next) => {
  console.log("Logging...");
  next();
});

//Do database connection
dbDebugger("Connected to the database...");

//Configurations
startupDebugger("Application Name: " + config.get("name"));
startupDebugger("Mail Server: " + config.get("mail.host"));
startupDebugger("Mail Password: " + config.get("mail.password"));

//Define routes
app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
