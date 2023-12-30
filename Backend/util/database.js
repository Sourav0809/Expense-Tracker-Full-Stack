const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('expensetracker', 'root', 'Spathak@1', {
    dialect: "mysql",
    host: 'localhost',
    logging: false
})



module.exports = sequelize