const router = require('express').Router();
let AuthUser = require('../models/auth_user');
const bcrypt = require('bcryptjs');

// routes here
router.route('/login').post((req, res) => {

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
                            res.json({
                                user: { 
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                }
                            });
                        });
                });
            });
        }); 

});

module.exports = router;