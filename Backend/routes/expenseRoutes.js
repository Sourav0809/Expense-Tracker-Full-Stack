const express = require('express')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

// for adding some new expenses
router.post('/addexpense', authMiddleware, addExpense)

// for fetching the all expenses
router.get('/getexpenses', authMiddleware, getExpense)

// for deleing expenses
router.delete('/deleteexpense', authMiddleware, deleteExpense)

module.exports = router