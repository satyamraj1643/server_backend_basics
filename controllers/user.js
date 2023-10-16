const mongoose = require("mongoose");
const { User } = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allUser = await User.find({})
    console.log(allUser);
    res.send(allUser);
}

async function handlegetUserbyId(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user Not Found" });

    return res.json(user);
}

async function handleUpdateUserbyId(req, res) {
    await User.findByIdAndUpdate(req.params.id, {});
}

async function handleDeleteUserByid(req, res) {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ status: "Deleted" });
    res.end();
}

async function handleNewAccountCreation(req, res) {
    const body = req.body; // it will be undefined as express does not know what to do with it, so we use express middleware
    console.log(req.body);

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        res.status(400).end();
    }
    // users.push({...body, id : users.length +1});
    // fs.writeFile('./MOCK_DATA.json',  JSON.stringify(users), (err,data)=>{
    //     if(!err){
    //         console.log("New Account Created");
    //         res.status(201).end();
    //     }
    // })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });

    console.log(result);

    const all = await User.find({});
    console.log(all);

    return res.status(201).json({ status: "Success" });


}

module.exports = {
    handleGetAllUsers,
    handlegetUserbyId,
    handleUpdateUserbyId,
    handleDeleteUserByid,
    handleNewAccountCreation,

}