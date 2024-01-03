const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const authRoutes = require('./routes/authRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const db = require('./util/database')
const userModel = require('./models/userModel')
const expenseModel = require('./models/expenseModel')
const orderModel = require("./models/orderModel")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/user', expenseRoutes)
app.use('/payment', paymentRoutes)

// associations
userModel.hasMany(expenseModel)
expenseModel.belongsTo(userModel)

userModel.hasMany(orderModel)
orderModel.belongsTo(userModel)

db.sync({ force: true })
    .then(() => {
        app.listen(4000, () => {
            console.log('App Started ..')
        })

    })
    .catch(err => console.log(err))