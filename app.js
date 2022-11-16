const Logger = require("./logger");
const mongoose = require("mongoose");
const _ = require("underscore");
const logger = new Logger();

logger.on("logging", (args) => {
  console.log("Listener called ", args);
});

logger.log("downloading...");

//var message = "mgs";
