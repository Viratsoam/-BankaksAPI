// require
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const UserModel = require('./model/user');

// connect to the db
mongoose.connect(process.env.DATABASE,
    { useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true
    }).then(()=>{
        console.log("DB CONEECTED!!");
});

// Auth
require('./auth/auth');

// MiddleWare
app.use( bodyParser.urlencoded({ extended : false }) );
app.use(bodyParser.json())
const routes = require('./routes/user');
const secureRoute = require('./routes/secure_user');

// routes
app.use('/', routes);
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

// Start the Server
app.listen(process.env.PORT || 3000, (err) => {
    if(err){
        console.log(`Error:${err}`);
        return;
    }
    console.log(`Server Started at port:${process.env.PORT}`);
});