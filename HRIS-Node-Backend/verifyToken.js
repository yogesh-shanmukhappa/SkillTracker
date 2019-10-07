
module.exports = {
    file: function(authData, res) {
        authData.message = "tes";
        authData.datetime = new Date();
        var fs = require('fs');
        var logger = fs.createWriteStream('log.txt', {
              flags: 'a' // 'a' means appending (old data will be preserved)
            });
        logger.write(JSON.stringify(authData),"\n");
    }
};
