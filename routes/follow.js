const express = require('express');
const { follow, isFollowing } = require('../controllers/follow');
const { check } = require('express-validator');
const { authenticateUser } = require('../middlewares/authenticateUser');

const router = express.Router();

router.post('/', [
    check('following', 'Please send profile id which you want to follow').notEmpty()
], [authenticateUser], follow);

router.post('/isFollowing', [
    check('following', 'Please send profile id which you want to follow').notEmpty()
], [authenticateUser], isFollowing)
module.exports = router;