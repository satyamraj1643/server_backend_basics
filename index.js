
// WE ARE DESIGNING A JSON REST API (CSR-client side rendering)
const express = require("express");
const fs = require("fs");
var users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8002;

app.use (express.urlencoded({extended : false}));  
app.use((req, res, next)=>{
    fs.appendFile("./log.txt", `\n ${Date.now()} : ${req.method} : ${req.path}` , (err ,data)=>{
        if(err){
            console.log("An error ocurred while taking log!");
            res.end("Server has some issues , please try again later");
        } 
        next();
    });
   
})


// Middleware/plugin

// app.use((req, res, next)=>{
//     console.log("Hello from middleware 1");
//    console.log(req.headers)
//     res.setHeader("X-myname", "satyamraj"); // Always add X to custom headers
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("hello from middleware 2");
//     //next();
//     res.end("Routes blocked by middleware 😒")
// })

app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.get("/users", (req, res) => {
    const html = `<ul>
        ${users.map(user => `<li> ${user.first_name} ${user.last_name} </li>`).join("")}
       
    </ul>`
    res.send(html);
})

app.route("/api/users/:id") 
.get((req, res) => {
    const id = req.params.id;
    console.log(id)
  
    const user = users[id-1];
    
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    
     return res.json(user);
  })
  

.patch((req, res) => {
    const id = req.params.id-1;;
    const toUpdate = users[id];
   
    for (const prop in req.body) {
        if (toUpdate[prop] !== req.body[prop]) {
            toUpdate[prop] = req.body[prop];
        }
    }
    var newobject = [];
    newobject.push(toUpdate)

    for(let i = 0; i< users.length ; i++){
        if(users[i].id!= id +1){
           newobject.push(users[i]);
        }
    }  
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(newobject, null, 2), (err) => {
        if (err) {
            console.log("An error ocurred writing the file");
            res.end();
        }
        res.status(201).end();
        
         
    });
})

.delete((req, res) => {
    const id = req.params.id;
    const indextodelete = id -1; 
    
    // Check if the ID is within the valid range
    if (id < 0 || id >= users.length) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Log the user which is about to deleted

    var updated = [];

    // Create a new array with the user removed
     for(var i = 0; i< users.length; i++){
          if(users[i].id != id){
            updated.push(users[i]);
          }
     }
    
   const updatedJson = JSON.stringify(updated, null, 2);
    fs.writeFile("./MOCK_DATA.json", updatedJson , (err)=>{
        if(err){
            console.log("An error ocurred");
            res.json({status : "an error ocurred"})
        }

        res.json({status: "Sucessfully deleted"})

    })

});


app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const html = `<ul>
    <li>
        ${users[id].first_name}
        ${users[id].last_name}
      </li>  
    </ul>`
    res.send(html);
})

app.post("/api/users", (req, res) => {
    const body = req.body; // it will be undefined as express does not know what to do with it, so we use express middleware
    console.log(req.body);

    if(!body ||!body.first_name ||!body.last_name ||!body.email ||!body.gender ||!body.job_title){
        res.status(400).end();
    }
    users.push({...body, id : users.length +1});
    fs.writeFile('./MOCK_DATA.json',  JSON.stringify(users), (err,data)=>{
        if(!err){
            console.log("New Account Created");
            res.status(201).end();
        }
    })


    })


app.listen(PORT, () => {
    console.log("Server Started");
})

