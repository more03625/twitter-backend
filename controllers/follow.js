const Follow = require('../models/follow');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../lib/sendResponse');

exports.follow = async (req, res) => {
    const results = validationResult(req);
    if (results.errors.length > 0) {
        return res.status(200).json({
            error: true,
            title: results.errors[0].msg,
            errors: results
        });
    }
    const token = req.headers.authorization;
    const decode = jwt.decode(token.split(" ")[1]);

    let followData = {
        follower: decode.id,
        following: req.body.following
    }

    const checkResult = await Follow.findOne(followData);
    if (!checkResult) {
        const isUserFollowing = await Follow.create(followData);
        if (isUserFollowing) {
            sendResponse(res, 200, false, 'following');

        } else {
            sendResponse(res, 422, true, 'Unable to follow this user');
        }
    } else {
        const result = await Follow.findOneAndDelete(followData);
        if (result) {
            return res.status(200).json({
                error: false,
                title: "Unfollowed",
            })
        } else {
            return res.status(422).json({
                error: true,
                title: "Unable to unFollow this user",
            })
        }
    }
}