const User = require('../controllers/User')
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.route('/login')
    .post(passport.authenticate('local'),User.login)

router.route('/register')
    .post(User.register)

module.exports = router;