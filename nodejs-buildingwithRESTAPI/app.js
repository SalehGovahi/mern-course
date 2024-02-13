const express = require('express');
const bodyParser = require('body-parser');


const placeRoutes = require('./routes/places-route');
const app = express();

app.use(bodyParser.json());
app.use('/api/places/',placeRoutes);

app.use((error, req, res, next) => {
    if (res.headersent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "Unknown error happened"});
})

app.listen(3000)