const userModel = require('../models/userModel')

const premiumController = {
    getLeaderBoard: async (req, res) => {

        try {
            const findLeaderBoard = await userModel.findAll({
                attributes: ["id", 'userName', 'totalTransaction'],
                order: [['totalTransaction', 'DESC']]
            });

            res.status(200).send(findLeaderBoard)

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}


module.exports = premiumController
