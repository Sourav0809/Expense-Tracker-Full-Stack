const { generateToken, decodeToken } = require('../helperFunctions')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const sib = require("sib-api-v3-sdk")
require('dotenv').config()

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
            res.status(500).send({ message: error })
        }

    },
    onUserForgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const client = sib.ApiClient.instance;
            const apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
            const transEmailApi = new sib.TransactionalEmailsApi();

            // sender and receivers
            const sender = { email: "pathaksourav798@gmail.com" };
            const receivers = [{ email }];

            const sendedEmail = await transEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: "Forgot Password From BudgetBuddy",
                textContent: `Hi , You can find a link below for resetting your password.`
            });

            console.log(sendedEmail);
            res.status(200).json({ message: 'Password reset email sent successfully.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }

}

module.exports = authController