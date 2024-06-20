const userModel=require("../model/userModel")

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({
            message:"kindly pass the token"
        })
    }
    jwt.verify(token, 'AzQ,PI)0', (err, user) => {
        if (err) {
            return res.status(403).send({
                message:"You are not Authorized"
            })
        }
        req.user = user;
        console.log("req.user----",req.user);
        next();
    });
};

module.exports=authenticateToken

// const authorizeRole = (role) => {
//     return (req, res, next) => {
//         if (req.user.role !== role) {
//             return res.sendStatus(403);
//         }
//         next();
//     };
// };

// module.exports = {
//     authenticateToken,
//     authorizeRole
// };
