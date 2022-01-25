
const express = require('express');
const router = express.Router();

const { getUserProfile, updateProfile } = require('../controllers/profile')
const auth = require('../middlewares/authenticateUser');

router.patch('/', [auth.authenticateUser], updateProfile)
router.get('/:userId', [auth.authenticateUser], getUserProfile)

module.exports = router;