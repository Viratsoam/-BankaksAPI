const express = require('express');
const router = express.Router();
require('dotenv').config();
const Contact = require('../model/contact');
const User = require('../model/user');
const messagebird = require('messagebird')(process.env.MESSAGEBIRDKEY);
// verify number 
router.post('/profile', function(req, res) {
    var name = req.body,name;
    var number = req.body.number;
    messagebird.verify.create(number, {
        originator : 'Code',
        template : 'Your verification code is %token.'
    }, function (err, response) {
        if (err) {
            console.log(err);
            res.json({
                error : err.errors[0].description
            });
        } else {
            console.log(response);
            // Contact.create({name:name,phone:number});
            res.json({
              Message:"Success Fully Verified",
              user:req.user,
              response : response
            });
        }
    });
});

module.exports = router;