const {body} = require('express-validator')
const {validationResult} = require('express-validator')

const requestBody = [
    body('username').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    // body('dist').notEmpty(),
    // body('area').notEmpty(),
    // body('pincode').notEmpty().isNumeric(),
    // body('landmark').notEmpty(),
    // body('phone').notEmpty().isNumeric(),

]

const requestValid = (req,res,next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array().map(err=> `${err.path} is ${err.msg}`)})
    }

    next()
}

module.exports = {
    requestBody,
    requestValid
}