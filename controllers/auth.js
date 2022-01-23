
// Models
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(403).json({
            error: true,
            title: "Invalid email or password!",
            data: null
        })
    } else {

        const accessToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: "3d" });

        const { password, ...userData } = user._doc; // We have deleted `password` KEY from `user` object & saved other data to new `userData` object and passed it
        res.status(200).json({
            error: false,
            title: "User Logged in successfully!",
            token: accessToken,
            data: userData
        })
    }
}
exports.signup = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(403).json({
            error: true,
            title: "This email already exist!",
            data: null
        })
    } else {

        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        const isUserCreated = await User.create(req.body)

        const { password, ...userData } = isUserCreated._doc; // We have deleted `password` KEY from `user` object & saved other data to new `userData` object and passed it

        if (isUserCreated) {
            return res.status(200).json({
                error: false,
                title: "User has been regsiterd successfully!",
                data: userData
            })
        } else {
            return res.status(422).json({
                error: true,
                title: "Unable to register this user!",
                data: null
            })
        }

    }
}
exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.status(200).json({
        error: false,
        title: "Logged Out Successfully"
    })
}