const expenseModel = require('../models/expenseModel')

const expenseController = {

    // when user add some expense 
    addExpense: async (req, res) => {

        const date = req.body.date
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        console.log(date, name, price, category)
        try {

            const addedExpense = await expenseModel.create({ date, name, price, category })
            res.send({ staus: "Success", id: addedExpense.id })


        } catch (error) {
            res.status(400).send({ message: "error try again !" })
        }
    },


    // when user want to fecth all expenses 
    getExpense: async (req, res) => {
        try {
            const allExpenses = await expenseModel.findAll()
            res.send(allExpenses)
        } catch (error) {
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