const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const port = process.env.PORT || 9001;
const config = require('./config');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/api", require('./routes'));



mongoose.connect(config.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDb connected");
    })
    .catch(err => {
        console.log("Error connecting with mongoDb:", err);
    });

//express server
app.listen(port, () => {
    console.log("Server Started on Port:", port);
});