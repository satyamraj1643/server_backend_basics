const fs = require("fs");

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n ${Date.now()} : ${req.method} : ${req.path}`, (err, data) => {
            if (err) {
                console.log("An error ocurred while taking log!");
                res.end("Server has some issues , please try again later");
            }
            next();
        });
    }
}

module.exports = {
    logReqRes,
}