const express = require("express");
const { handleGetAllUsers, handlegetUserbyId, handleUpdateUserbyId, handleDeleteUserByid, handleNewAccountCreation } = require("../controllers/user")

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleNewAccountCreation)

// router.get("/users", async  (req, res) => {

//     const allUser = await User.find({});
//     const html = `<ul>
//         ${allUser.map(user => `<li> ${user.firstName} ${user.lastName} - ${user.email} </li>`).join("")}

//     </ul>`
//     res.send(html);
// })

router.route("/:id")
  .get(handlegetUserbyId)

  .patch(handleUpdateUserbyId)

  .delete(handleDeleteUserByid)


// router.get("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const html = `<ul>
//     <li>
//         ${users[id].first_name}
//         ${users[id].last_name}
//       </li>  
//     </ul>`
//     res.send(html);
// })



module.exports = router;