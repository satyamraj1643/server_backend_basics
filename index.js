
// WE ARE DESIGNING A JSON REST API (CSR-client side rendering)
const express = require("express");
const fs = require("fs");
//var users = require("./MOCK_DATA.json");
const UserRouter = require("./routes/user");
const PORT = 8000;
const { connectMongoDb } = require("./DBconnection")
const app = express();
const { logReqRes } = require("./middlewares/user");

///Connecting mongoDB with nodejs

connectMongoDb("mongodb://127.0.0.1:27017/web-app")


app.use(logReqRes("log.txt"));
app.use(express.urlencoded({ extended: false }));

// app.use (express.urlencoded({extended : false}));  
app.use('/api/users', UserRouter);
app.listen(PORT, () => {
    console.log("Server Started");
})

