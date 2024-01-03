const Razorpay = require("razorpay")
const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const { RZP_KEY_ID, RZP_KEY_SECRET } = require('../constants')
const { decodeToken } = require('../helperFunctions')


const paymentController = {
    buyPremium: async (req, res) => {
        const { id } = req.user
        try {
            const rzp = new Razorpay({
                key_id: RZP_KEY_ID,
                key_secret: RZP_KEY_SECRET
            })
            const amount = 2500
            rzp.orders.create({ amount: amount, currency: 'INR' }, async (err, order) => {
                try {
                    if (err) {
                        throw new Error(JSON.stringify(err))
                    }
                    await orderModel.create({ orderId: order.id, status: "pending", userId: id })
                    res.send({ order, key_id: RZP_KEY_ID }).json()

                } catch (error) {
                    res.status(400).send({ message: "Some error", error: error })
                }

            })


        } catch (error) {
            console.log(error)
            res.status(400).send({ message: "some error", error: error })
        }
    },

    updatePremiumStatus: async (req, res) => {
        console.log(req.user)
        try {
            const { order_id, payment_id } = req.body;
            const findedorder = await orderModel.findOne({ where: { orderId: order_id } });
            await Promise.all([
                findedorder.update({ paymentId: payment_id, status: "success" }),
                req.user.update({ isPremiumUser: true })
            ]);
            res.send({ success: true });

        } catch (error) {
            // Handle the original error
            console.log(error)
            res.status(400).send({ message: "some error", error: error });

        }
    },

    updateStausToFailed: async (req, res) => {
        try {
            const { order_id } = req.body;
            const findedorder = await orderModel.findOne({ where: { orderId: order_id } });
            await findedorder.update({ status: "failed" });
            res.status(400).send({ success: false, message: "Payment failed" });
        } catch (error) {
            // Handle the original error
            res.status(400).send({ message: "some error", error: error });
        }
    }



}

module.exports = paymentController