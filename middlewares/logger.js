const EventEmitter = require("events");
// const emitter = new EventEmitter();
// const fs = require("fs");
// const os = require("os");
// const path = require("path");

// fs.readdir("./", (er, file) => {
//   if (er) console.log("Error ", er);
//   else console.log("File", file);
// });

// const user = os.userInfo();
// console.log(user);
var url = "https://www.mylogger.com/log";
class Logger extends EventEmitter {
  log(message) {
    // Make HTTP call for logging
    this.emit("logging", { data: message });
    console.log(message);
  }
}

// emitter.on("logging", (args) => {
//   console.log(args);
// });

// module.exports.logged = log;
// //OR
// module.exports = log;
// //OR

module.exports = Logger;
