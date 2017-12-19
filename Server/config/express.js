const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors')

module.exports = app => {


    app.use(helmet());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())
  
    app.use(passport.initialize());

    app.use(cors())


    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });
};