const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

// Environment variables
const dotenv = require('dotenv');
dotenv.config()

const app = express();

// Config database
mongoose.connect(process.env.DATABASE, 
{ useNewUrlParser: true, useUnifiedTopology: true },
 (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
})

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json('Hello Mrudula');
});

app.post('/', (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Successfully saved user!!')
        }
    })
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('listening....');
    }
})