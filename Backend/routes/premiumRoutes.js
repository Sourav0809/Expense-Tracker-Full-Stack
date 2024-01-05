const express = require("express")
const authMiddleware = require('../middlewares/authMiddleware')
const { getLeaderBoard } = require('../controllers/premiumController')
const router = express.Router()

router.get('/getleaderboard', getLeaderBoard)


module.exports = router