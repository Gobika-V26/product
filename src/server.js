const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();


app.use(express.urlencoded({ extended: true }));


mongoose.connect(
    "mongodb://user_453w55cx8:p453w55cx8@db01.dbhost.dev:5050/db_453w55cx8"
)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});


const memberSchema = new mongoose.Schema({
    memberId: String,
    name: String,
    department: String,
    year: Number,
    club: String
});


const Member = mongoose.model("Member", memberSchema);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.post("/members", async (req, res) => {

    console.log(req.body);

    const member = new Member({
        memberId: req.body.memberId,
        name: req.body.name,
        department: req.body.department,
        year: req.body.year,
        club: req.body.club
    });

    await member.save();

    res.send("Club member added successfully");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});