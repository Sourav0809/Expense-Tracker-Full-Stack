const expenseModel = require('../models/expenseModel')
const userModel = require('../models/userModel')
const { decodeToken } = require('../helperFunctions')

const expenseController = {
    // when user add some expense 
    addExpense: async (req, res) => {
        const { date, name, price, category } = req.body
        const { id } = req.user
        try {
            const userId = id
            const addedExpense = await expenseModel.create({ date, name, price, category, userId })
            res.send({ staus: "Success", id: addedExpense.id })


        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "error try again !" })
        }
    },


    // when user want to fecth all expenses 
    getExpense: async (req, res) => {
        const { userEmail, id, isPremiumUser } = req.user
        try {
            if (userEmail && id) {
                const allExpenses = await expenseModel.findAll({ where: { userId: id } })
                const userExpenses = {
                    expenses: allExpenses,
                    isPremiumUser: isPremiumUser
                }
                res.send(userExpenses)

            }
        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "error while getting the expenses" })
        }
    },


    // when user want to delete his/her expense 
    deleteExpense: async (req, res) => {
        const id = req.body.id
        try {
            if (id) {
                const findedExpenses = await expenseModel.findOne({ where: { id: id } })
                const deletedRes = await findedExpenses.destroy()
                res.send({ status: "Delete Success", id: deletedRes.id })

            }
        } catch (error) {
            res.staus(400).send({ message: "Error while deleting the expense" })
        }
    }

}



module.exports = expenseController

