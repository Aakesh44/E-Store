const Users = require('../model/users')
const generateToken = require('../utils/generateToken')

async function signUp(req,res) {
    
    try {

        const {email,...other} = req.body
        console.log(req.body);
        const userExist = await Users.findOne({email:email})

        if(userExist){
            return res.status(400).json({ error: 'email not available' });
        }

        const user = await  Users.create(req.body)

        if(!user) res.json('failed')    

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
    
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
    }
}

module.exports = signUp