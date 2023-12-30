const { onUserLogin, onUserSignUp } = require('../controllers/authController')
const express = require('express')

const router = express.Router()

router.post('/signup', onUserSignUp)

router.post('/login', onUserLogin)


module.exports = router