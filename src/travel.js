const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(
    "mongodb://user_453w55cx8:p453w55cx8@db01.dbhost.dev:5050/db_453w55cx8"
)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});

// Schema
const travelSchema = new mongoose.Schema({
    travellerId: String,
    name: String,
    destination: String,
    travelDate: String,
    budget: Number,
    email: String
});

// Model
const Traveller = mongoose.model("Traveller", travelSchema);

// Display HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index2.html"));
});

// Insert traveller
app.post("/travellers", async (req, res) => {

    console.log(req.body);

    const traveller = new Traveller({
        travellerId: req.body.travellerId,
        name: req.body.name,
        destination: req.body.destination,
        travelDate: req.body.travelDate,
        budget: req.body.budget,
        email: req.body.email
    });

    await traveller.save();

    res.send("Travel buddy added successfully");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});