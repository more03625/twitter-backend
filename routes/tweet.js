const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createTweet, getTweets, getTweetByID, deleteTweetByID } = require('../controllers/tweet')
const auth = require('../middlewares/authenticateUser');

router.post('/', [auth.authenticateUser], createTweet) // Check if user exist here.

router.get('/', getTweets)

router.get('/:tweetId', getTweetByID)

router.delete('/:tweetId', [auth.authenticateUser], deleteTweetByID)

module.exports = router;