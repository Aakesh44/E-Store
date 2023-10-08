const Users = require('../model/users')
const generateToken = require('../utils/generateToken')

async function logIn(req,res) {
    
    try {
        const {email,password} = req.body 

        const user = await Users.findOne({email:email})
        
        if(user && (await user.matchPassword(password))){
            res.json({
                _id:user._id,
                username:user.username,
                email:user.email,
                dist:user.dist,
                area:user.area,
                pincode:user.pincode,
                landmark:user.landmark,
                phone:user.phone,
                card_name:user.card_name,
                card_number:user.card_number,
                card_date:user.card_date,
                card_cvv:user.card_cvv,
                likedProducts:user.likedProducts,
                cartProducts:user.cartProducts,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(400).json('invalid email or password')
        }
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

module.exports = logIn