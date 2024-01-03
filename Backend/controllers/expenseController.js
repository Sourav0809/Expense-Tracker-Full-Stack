const expenseModel = require('../models/expenseModel')
const userModel = require('../models/userModel')
const { decodeToken } = require('../helperFunctions')

const expenseController = {
    // when user add some expense 
    addExpense: async (req, res) => {
        const { token } = req.headers
        const { date, name, price, category } = req.body

        try {
            const { email } = decodeToken(token)
            const findUsers = await userModel.findAll({ where: { userEmail: email } })
            const userId = findUsers[0].id
            const addedExpense = await expenseModel.create({ date, name, price, category, userId })
            res.send({ staus: "Success", id: addedExpense.id })


        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "error try again !" })
        }
    },


    // when user want to fecth all expenses 
    getExpense: async (req, res) => {
        const { token } = req.headers
        try {
            if (token) {
                const { email, password } = decodeToken(token)
                const findUser = await userModel.findAll({ where: { userEmail: email } })
                const userId = findUser[0].id
                const allExpenses = await expenseModel.findAll({ where: { userId: userId } })
                res.send(allExpenses)

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
                const findedExpenses = await expenseModel.findAll({ where: { id: id } })
                const deletedRes = await findedExpenses[0].destroy()
                res.send({ status: "Delete Success", id: deletedRes.id })

            }
        } catch (error) {
            res.staus.send({ message: "Error while deleting the expense" })
        }
    }

}



module.exports = expenseController

