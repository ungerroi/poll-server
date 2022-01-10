const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const apiRouter = require('./routes/api');
const contextService = require('request-context');
const cors = require('cors')
const app = express();
const {port} = require("./config.js")

app.use(cors({credentials: true, origin: 'http://localhost:3002'}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(contextService.middleware('request'));
app.all('*', function(req, res, next) {
  contextService.set('request.req', req);
  next();
})

app.use('/api', apiRouter)


mongoose.connect('mongodb+srv://roi:Eiuy76008Riuy76009@fullstackone.eswo8.mongodb.net/pollApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
mongoose.connection.on("connected", () => {console.log("mongoose is connected")})




db.on;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = app;