const express = require('express');
var cors = require("cors")
var bodyParser = require('body-parser');
var database = require('./config/database')
var fileupload=require("express-fileupload")
var session =require('express-session')
var app=express()
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileupload())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
app.use(express.static('asset'))
database()
app.use('/DPR', require('./routes/form.routes')) //importing routes
app.listen(4000)