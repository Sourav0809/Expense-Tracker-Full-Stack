const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const authRoutes = require('./routes/authRoutes')
const db = require('./util/database')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.use('/auth', authRoutes)

db.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('App Started ..')
        })

    })
    .catch(err => console.log(err))