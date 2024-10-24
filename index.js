const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require("./routes/userRoute.js");

app.use('/api/users', userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
});