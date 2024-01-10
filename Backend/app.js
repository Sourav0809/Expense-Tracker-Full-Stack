const express = require('express')

// importing middlewares 
const cors = require('cors')
const bodyParser = require('body-parser')

// importing env
require('dotenv').config()

// importing routes
const authRoutes = require('./routes/authRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const premiumRoutes = require('./routes/premiumRoutes')

// importing database
const db = require('./util/database')

// importing models 
const userModel = require('./models/userModel')
const expenseModel = require('./models/expenseModel')
const orderModel = require("./models/orderModel")
const forgotPwdModel = require('./models/forgotPassowrdModel')

const app = express()

// applying middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//applying routes
app.use('/auth', authRoutes)
app.use('/user', expenseRoutes)
app.use('/payment', paymentRoutes)
app.use('/premium', premiumRoutes)

// associations
userModel.hasMany(expenseModel)
expenseModel.belongsTo(userModel)
userModel.hasMany(orderModel)
orderModel.belongsTo(userModel)
userModel.hasMany(forgotPwdModel)
forgotPwdModel.belongsTo(userModel)


// sync database and listen
db.sync()
    .then(() => {
        app.listen(process.env.RUNNING_PORT, () => {
            console.log('App Started ..')
        })

    })
    .catch(err => console.log(err))



