require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    // check for token 
    if(!token) {
        // 401 - unauthorized
        res.status(401).json({
            msg: 'No token, authorization denied',
        }); 
    }

    try{

        // verify token 
        const decoded = jwt.verify(token, process.env.jwtSecret);
            
        // add user from payload
        req.user = decoded;
        next();

    } catch(e) {
        // throw e;
        res.status(400).json({
            msg: e,
        });
    }

}

module.exports = auth;