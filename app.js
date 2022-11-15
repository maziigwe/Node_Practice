const Logger = require("./logger");
const logger = new Logger();

logger.on("logging", (args) => {
  console.log("Listener called ", args);
});

logger.log("downloading...");
//var message = "mgs";
