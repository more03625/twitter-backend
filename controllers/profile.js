const User = require('../models/user')
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { sendResponse } = require('../lib/sendResponse');

exports.getUserProfile = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        sendResponse(res, 400, true, 'Invalid tweet id', null);
    };

    const user = await User.find({ status: 1, _id: req.params.userId });
    const { password, ...updatedUserObject } = user[0]._doc;

    if (user) {
        return res.status(200).json({
            error: false,
            title: "User fetched successfully!",
            data: updatedUserObject,
        });
    } else {
        return res.status(422).json({
            error: true,
            title: "Unable to fetch user!",
            data: null
        });
    }
}
exports.updateProfile = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body._id, req.body);
    const { password, ...updatedUserObject } = user._doc;
    console.log(updatedUserObject);
    if (user) {
        return res.status(200).json({
            error: false,
            title: "User updated successfully!",
            data: updatedUserObject,
        });
    } else {
        return res.status(422).json({
            error: true,
            title: "Unable to update user!",
            data: null
        });
    }

}