require('dotenv').config()
const { JWT_SECRET } = require('./constants')
const jwt = require("jsonwebtoken")
const AWS = require("aws-sdk");


// helper function to encode email,password 

const generateToken = (email, password) => {
    return jwt.sign({ email, password }, JWT_SECRET)
}

// helper function to decode the jwt token
const decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

// exporting 
module.exports = { generateToken, decodeToken }


