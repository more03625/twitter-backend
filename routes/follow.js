const express = require('express');
const { follow } = require('../controllers/follow');
const { check } = require('express-validator');
const { authenticateUser } = require('../middlewares/authenticateUser');

const router = express.Router();

router.post('/', [
    check('following', 'Please send profile id which you want to follow').notEmpty()
], [authenticateUser], follow)

module.exports = router;