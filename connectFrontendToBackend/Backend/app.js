const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRoutes = require("./routes/places-route");
const userRoutes = require("./routes/users-route");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

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
    .connect("mongodb+srv://salehgovahi:salehgovahi@cluster0.koawfrg.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log("connected"), app.listen(5000))
    .catch((err) => {
        console.log(err);
    });
