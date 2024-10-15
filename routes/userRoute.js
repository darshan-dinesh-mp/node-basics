const router = require("express");
const route = router();
const users = require("../users.json");
const fs = require("fs");
const path = require("path");


const usersFilePath = path.resolve(__dirname, "../users.json");

route.get("/", (req, res) => {
    return res.json(users);
});

route.post("/", (req, res) => {
    users.push(req.body);
    fs.writeFile(usersFilePath, JSON.stringify(users), (error, data) => {
        console.log("User added");
        return res.send("User added");
    })
});

route.patch("/:id", (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));
    const userPos = users.indexOf(user);
    const userObj = Object.assign(user, req.body);
    users[userPos] = userObj;
    console.log(users[userPos]);
    fs.writeFile(usersFilePath, JSON.stringify(users), (error, data) => {
        console.log("User updated");
        return res.send("User updated");
    })
});

route.get("/:id", (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));
    return res.json(user);
});

module.exports = route;