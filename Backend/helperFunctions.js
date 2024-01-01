const { JWT_SECRET } = require('./constants')
const jwt = require("jsonwebtoken")

const generateToken = (email, password) => {
    return jwt.sign({ email, password }, JWT_SECRET)
}

const decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}


module.exports = { generateToken, decodeToken }