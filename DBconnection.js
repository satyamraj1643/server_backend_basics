const mongoose = require("mongoose");
const userScema = require("./models/user");



async function connectMongoDb(url) {

    return ( await mongoose.connect(url)
        .then(() => {
            console.log("Database Sucessfully Connected");
        })
        .catch(() => {
            console.log("An error ocurred");
        })
    )


}


module.exports = {
    connectMongoDb,
};

