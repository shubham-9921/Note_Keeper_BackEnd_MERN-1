const express = require('express');
const { registerUser, authUser } = require('../controllers/userController')

const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/register').post(registerUser);

module.exports = router;    