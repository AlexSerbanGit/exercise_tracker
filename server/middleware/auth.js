require('dotenv').config();
const jwt = process.env.jwtSecret;

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
        res.status(400).json({
            msg: 'Token is not valid',
        });
    }

}

module.exports = auth;