const { generateToken, decodeToken } = require('../helperFunctions')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')


const authController = {

    authenticateUser: async (req, res) => {
        const token = req.body.token
        try {
            if (token) {
                const { email, password } = decodeToken(token)
                const findUser = await userModel.findAll({ where: { userEmail: email } })
                const match = await bcrypt.compare(password, findUser[0].userPwd)

                if (match) {
                    res.send({ status: "User verfied" })
                } else {
                    res.status(400).send({ message: "Error ! log in again " })
                }
            } else {
                res.status(400).send({ message: "Error ! log in again " })
            }

        } catch (error) {

        }
    },


    onUserSignUp: async (req, res) => {
        const { userName, userEmail, userPhone, userPwd } = req.body

        try {
            const findusers = await userModel.findAll({ where: { userEmail: userEmail } })
            const finduser = findusers[0]
            if (finduser) {
                res.status(400).send({ message: "User Exist", });
            }

            else {
                const hashPwd = await bcrypt.hash(userPwd, 10)
                const createdUser = await userModel.create({ userName, userEmail, userPhone, userPwd: hashPwd })

                if (createdUser) {
                    const token = generateToken(userEmail, userPwd)
                    res.send({ status: "Success", token: token })
                }
            }

        } catch (error) {
            console.log(error)
            res.status(400).send({ message: error })
        }

    },

    onUserLogin: async (req, res) => {
        const { userEmail, userPwd } = req.body

        try {
            if (userEmail && userPwd) {
                const findedUsers = await userModel.findAll({ where: { userEmail: userEmail } })
                const findedUser = findedUsers[0]

                // if user found then we have to check the password

                if (findedUser) {
                    const match = await bcrypt.compare(userPwd, findedUser.userPwd);

                    if (match) {
                        const token = generateToken(userEmail, userPwd)
                        res.send({ status: "success", message: "successfully login", token: token })
                    }
                    else {
                        res.status(400).send({ message: "Wrong Password" })
                    }
                }
                else {
                    res.status(404).send({ message: "User does not exist" })
                }
            }
        } catch (error) {
            res.status(400).send({ message: error })
        }

    }
}

module.exports = authController