const userModel = require('../models/userModel')
const expenseModel = require('../models/expenseModel');
const Sequelize = require("sequelize")


const premiumController = {
    getLeaderBoard: async (req, res) => {
        try {
            const findLeaderBoard = await userModel.findAll({
                attributes: ["id", 'userName', [Sequelize.fn('sum', Sequelize.col('expenses.price')), 'totalAmount']],
                include: [{ model: expenseModel, attributes: [] }],
                group: ['users.id'],
                order: [['totalAmount', 'DESC']]
            });

            res.status(200).send(findLeaderBoard)

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }


}


module.exports = premiumController
