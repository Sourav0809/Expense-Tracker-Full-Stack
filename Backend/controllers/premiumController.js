const userModel = require('../models/userModel')
const expenseModel = require('../models/expenseModel')


const premiumController = {
    getLeaderBoard: async (req, res) => {
        try {
            // Get all users
            const allUsers = await userModel.findAll();
            const newArr = [];
            for (const user of allUsers) {
                try {
                    const data = await expenseModel.findAll({ where: { userId: user.id } });

                    // Calculate total price for the user
                    const totalPrice = data.reduce((prev, next) => {
                        return Number(prev) + Number(next.price);
                    }, 0);

                    newArr.push({ name: user.userName, totalAmount: totalPrice });
                } catch (error) {
                    // Handle the error for individual user expenses query
                    console.error(error);
                }
            }
            res.status(200).json(newArr);
        } catch (error) {
            // Handle the error for fetching all users
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


}


module.exports = premiumController