const express = require('express')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenseController')
const router = express.Router()

// for adding some new expenses
router.post('/addexpense', addExpense)

// for fetching the all expenses
router.get('/getexpenses', getExpense)


// for deleing expenses

router.delete('/deleteexpense', deleteExpense)
module.exports = router