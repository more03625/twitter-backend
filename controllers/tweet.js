const Tweet = require('../models/tweet');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { sendResponse } = require('../lib/sendResponse');
const jwt = require('jsonwebtoken');

exports.createTweet = async (req, res) => {

    const results = validationResult(req);
    if (results.errors.length > 0) {
        return res.status(200).json({
            error: true,
            title: results.errors[0].msg,
            errors: results
        })
    }
    if (!req.body.tweet && !req.body.images) {
        return res.status(422).json({
            error: true,
            title: "Please write something or add image",
            data: null,
        });
    }

    try {
        const token = req.headers.authorization;
        const decode = jwt.decode(token.split(" ")[1]);

        let extraInformation = {
            createdBy: decode.id,
        }

        let formattedTweet = { ...req.body, ...extraInformation }

        const userTweet = await Tweet.create(formattedTweet);

        if (userTweet) {
            return res.status(200).json({
                error: false,
                title: "Your tweet was sent successfully!",
                data: userTweet
            })
        } else {
            return res.status(422).json({
                error: true,
                title: "Unable to create tweet",
                data: null
            })
        }
    } catch (err) {
        // sendResponse(res, 500, true, err, null);
        return res.status(500).json({
            error: true,
            title: err,
            data: null
        })
    }
}
exports.getTweets = async (req, res) => {

    let { page, size } = req.query;

    if (!page) {
        page = 1
    }

    if (!size) {
        size = 10
    }

    const limit = parseInt(size)
    const skip = (page - 1) * size

    let condition;

    if (!req.query.userId || req.query.userId === 'undefined') { //URL userID

        condition = {
            status: 1
        }
    } else {
        condition = {
            createdBy: req.query.userId,
            status: 1
        }
    }
    let requiredFeilds = { 'name': 1, 'email': 1, '_id': 1, 'profileImage': 1 }
    const tweets = await Tweet.find(condition).populate('createdBy', requiredFeilds).skip(skip).limit(limit).sort({ createdAt: -1 });

    const count = await Tweet.countDocuments(condition);
    if (tweets) {
        return res.status(200).json({
            error: false,
            title: "Tweets fetched successfully!",
            count,
            data: tweets,
        });
    } else {
        return res.status(422).json({
            error: true,
            title: 'Unable to fetch tweets!',
            data: null
        })
    }
}
exports.getTweetByID = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.tweetId)) {
        return res.status(400).json({
            error: true,
            title: 'Invalid tweet id',
            data: null
        })
    };
    const tweet = await Tweet.find({ status: 1, _id: req.params.tweetId });

    if (tweet) {
        return res.status(200).json({
            error: false,
            title: "Tweet fetched successfully!",
            data: tweet,
        });
    } else {
        return res.status(422).json({
            error: true,
            title: "Unable to fetch tweet!",
            data: null
        });
    }
}
exports.deleteTweetByID = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.tweetId)) {
        return res.status(400).json({
            error: true,
            title: "Invalid tweet id",
            data: null,
        })
    };
    const isTweetDeleted = await Tweet.deleteOne({ _id: req.params.tweetId });

    if (isTweetDeleted) {
        return res.status(200).json({
            error: false,
            title: "Tweet has been deleted successfully!",
        })
    } else {
        return res.status(422).json({
            error: true,
            title: "Unable to delete this tweet",
        })
    }
}