const userModel = require('../models/userModel')

const authController = {
    onUserSignUp: async (req, res) => {
        const userName = req.body.userName
        const userEmail = req.body.userEmail
        const userPhone = req.body.userPhone
        const userPwd = req.body.userPwd
        try {
            const findusers = await userModel.findAll({ where: { userEmail: userEmail } })
            const finduser = findusers[0]
            if (finduser) {
                res.status(400).send({ message: "User Exist" });

            }
            else {
                const response = userModel.create({ userName, userEmail, userPhone, userPwd })
                res.send({ status: "Success", id: response.id })
            }

        } catch (error) {
            res.status(400).send({ message: error })
        }

    },

    onUserLogin: async (req, res) => {
        const userEmail = req.body.userEmail
        const userPwd = req.body.userPwd

        try {
            if (userEmail && userPwd) {
                const findedUsers = await userModel.findAll({ where: { userEmail: userEmail } })
                const findedUser = findedUsers[0]
                // if user found then we have to check the password
                if (findedUser) {
                    if (findedUser.userPwd === userPwd) {
                        res.send({ status: "success", message: "successfully login" })
                    }
                    else {
                        res.status(400).send({ message: "Wrong Password" })
                    }
                }
                else {
                    res.status(400).send({ message: "User does not exist" })
                }
            }
        } catch (error) {
            res.status(400).send({ message: error })
        }

    }
}

module.exports = authController