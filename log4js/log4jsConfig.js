const log4js = require("log4js");

log4js.configure({
    "appenders": {
      "application": {
        "type": "console"
      },
      "file": {
        "type": "file",
        "filename": "./log4js/scriptLogs.log",
        "compression": true,
        "maxLogSize": 10485760,
        "backups": 10
      }
    },
    "categories": {
      "default": {
        "appenders": [
          "application",
          "file"
        ],
        "level": "info"
      }
    }
});

module.exports = log4js.getLogger();