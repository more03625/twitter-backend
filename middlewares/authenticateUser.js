const jwt = require('jsonwebtoken')
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    // const decoded = jwt.decode(token.split(" ")[1]);

    if (!token) {
        res.status(401).json({
            title: "You are not authenticated to perform this action!",
            error: true
        });
    } else {
        jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({
                    title: "Invalid token",
                    error: true
                })
            } else {
                req.user = user;
                next()
            }
        });
    }
}
module.exports = { authenticateUser }

// const user = await User.findOne({ _id: decoded.id });
        // if (!user) {
        //     res.status(422).json({
        //         title: "Unable to authenticate this user!",
        //         error: true
        //     })
        // } 
        // else {
        //     jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        //         if (err) {
        //             res.status(401).json({
        //                 title: "Invalid token",
        //                 error: true
        //             })
        //         } else {
        //             req.user = user;
        //             next()
        //         }
        //     });
        // }