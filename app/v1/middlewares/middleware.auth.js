const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    if(!token) 
        return res.status(401).json({
            status: "fail",
            message: "Access denied. No token provided."
        });
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) 
            return res.status(401).json({
                status: "fail",
                message: "Invalid token."
            });
        req.user = decoded;
        next();
    })
}