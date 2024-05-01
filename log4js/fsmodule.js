var fs = require('fs');

fs.readFile('./log4js/scriptLogs.log', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});