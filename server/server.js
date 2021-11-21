const express = require('express');
const app = express();
const routes = require('./routes/index');
const mongoose = require("mongoose");
require("dotenv").config();


app.use(express.json())

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




app.get('/', (req, res) => {
    res.send("hello people");
})

app.use('/api', routes)






// let PORT = 5000;

app.listen(process.env.PORT, () => {
    console.log("app started at port :", process.env.PORT);
})