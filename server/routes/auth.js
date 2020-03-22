const router = require('express').Router();
let AuthUser = require('../models/auth_user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');
// Login route
router.route('/login').post((req, res) => {

    // res.json('Registered');

    const { email, password } = req.body;
    // return res.status(200).json({
    //     body : req.body,
    // });
    // validation
    if( !email || !password){
        return res.status(400).json({
            msg: 'Please exter all fields',
        });
    }

    // check for existing user
    AuthUser.findOne({ email: email })
        .then(user => {
            if(!user) {
                return res.status(400).json({
                    msg: 'This user does not exist',
                });
            }

            // validate password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) {
                        return res.status(400).json({
                            msg: 'Invalid credentials',
                        });
                    }

                    // create jwt
                    jwt.sign(
                        {
                            id: user.id,
                        },
                        process.env.jwtSecret,
                        {
                            expiresIn: 3600,
                        }, 
                        (err, token) => {
                            if(err){
                                throw err;
                            }

                            res.json({
                                token: token,
                                user: { 
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                }
                            });
                        }
                    );
                });

        }); 

});

// Register route
router.route('/register').post((req, res) => {

    // res.json('Registered');

    const { name, email, password } = req.body;
    // return res.status(200).json({
    //     body : req.body,
    // });
    // validation
    if(!name || !email || !password){
        return res.status(400).json({
            msg: 'Please exter all fields',
        });
    }

    // check for existing user
    AuthUser.findOne({ email: email })
        .then(user => {
            if(user) {
                return res.status(400).json({
                    msg: 'This email is already used',
                });
            }

            const newUser = new AuthUser({
                name: name,
                email: email,
                password: password,
            });

            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            // create jwt
                            jwt.sign(
                                {
                                    id: user.id,
                                },
                                process.env.jwtSecret,
                                {
                                    expiresIn: 3600,
                                }, 
                                (err, token) => {
                                    if(err){
                                        throw err;
                                    }

                                    res.json({
                                        token: token,
                                        user: { 
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                        }
                                    });
                                }
                            );
                            
                        });
                });
            });
        }); 

});

// get user data by jwt 
router.get('/get_user_data', auth, (req, res) => {
    AuthUser.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user);
        });
});

module.exports = router;