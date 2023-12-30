const userModel = require('../models/userModel')

const authController = {
    onUserSignUp: async (req, res) => {
        const userName = req.body.userName
        const userEmail = req.body.userEmail
        const userPhone = req.body.userPhone
        const userPwd = req.body.userPwd
        try {
            const finduser = await userModel.findAll({ where: { userEmail: userEmail } })
            if (finduser[0]) {
                res.status(400).send({ status: "User Exist" });

            }
            else {
                const response = userModel.create({ userName, userEmail, userPhone, userPwd })
                res.send({ status: "Success", id: response.id })
            }
            // if(finduser){
            //     const response = await userModel.create({ userName, userEmail, userPhone, userPwd })
            //     console.log(response)

            // }

        } catch (error) {

        }

    },

    onUserLogin(req, res) {
        console.log(req.body)
    }
}

module.exports = authController