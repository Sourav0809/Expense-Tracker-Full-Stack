const { onUserLogin, onUserSignUp, authenticateUser, onUserForgotPassword } = require('../controllers/authController')
const express = require('express')

const router = express.Router()

router.post('/authenticateuser', authenticateUser)

router.post('/signup', onUserSignUp)

router.post('/login', onUserLogin)

router.post('/forgotpassword', onUserForgotPassword)



module.exports = router