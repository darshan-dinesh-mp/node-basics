const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
const users = require("./users");
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    return res.send("Hello");
});


app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));
    return res.json(user);
});

app.post("/api/users", (req, res) => {
    users.push(req.body);
    fs.writeFile("./users.json", JSON.stringify(users), (error, data) => {
        console.log("User added");
        return res.send("User added");
    })
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
});