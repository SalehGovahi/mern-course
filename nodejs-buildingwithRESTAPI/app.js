const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRoutes = require("./routes/places-route");
const userRoutes = require("./routes/users-route");
const app = express();

app.use(bodyParser.json());
app.use("/api/places/", placeRoutes);
app.use("/api/users/", userRoutes);

app.use((error, req, res, next) => {
    if (res.headersent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Unknown error happened" });
});

mongoose
    .connect("mongodb://localhost:27017/Test")
    .then(console.log("connected"), app.listen(3000))
    .catch((err) => {
        console.log(err);
    });
