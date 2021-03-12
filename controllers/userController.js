let express = require('express');
let router = express.Router();

const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* Endpoints

http://localhost:3000/user/signup - POST
http://localhost:3000/user/login - POST

*/

/*****************
 * USER - SIGNUP
 ****************/
router.post('/signup', function(req,res){
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    })

    .then( user => {

        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            user: user,
            message: "New user has been created.",
            sessionToken: token
        });
    })
    .catch(err => res.status(500).json({error :err}))
});




 /*****************
 * USER - LOGIN
 ****************/
router.post('/login', function(req,res){
    User.findOne({
        where: {
            email: req.body.email
        }
    })

    .then(user => {
        if(user){

            bcrypt.compare(req.body.password, user.password, function(err,matches) {

                if(matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({
                        user: user,
                        message: "User is logged in.",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({error: "Login failed" });
                }
            });
        } else {
            res.status(500).json({error: 'User does not exist.'})
        }
    })
    .catch(err => res.status(500).json({error :err}))

});








 module.exports = router;