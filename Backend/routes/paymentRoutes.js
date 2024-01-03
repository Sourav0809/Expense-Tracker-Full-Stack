const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { buyPremium, updatePremiumStatus } = require('../controllers/paymentController')
const router = express.Router()


router.post('/buypremium', authMiddleware, buyPremium)
router.post('/updatepremiumstatus', authMiddleware, updatePremiumStatus)

module.exports = router