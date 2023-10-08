const Users = require('../model/users')

async function editProfile(req,res) {
    
    try {
        const username=req.body.username
        const _id = req.body.userId
        const dist=req.body.dist
        const area=req.body.area
        const pincode=req.body.pincode
        const landmark=req.body.landmark
        const phone=req.body.phone
        const card_name=req.body.card_name
        const card_number=req.body.card_number
        const card_date=req.body.card_date
        const card_cvv=req.body.card_cvv

        const user = await Users.findByIdAndUpdate(
            _id,
            {
                $set:{
                    username:username && username,
                    dist:dist && dist,
                    area:area && area,
                    pincode:pincode && pincode,
                    landmark:landmark && landmark,
                    phone:phone && phone,
                    card_name:card_name && card_name,
                    card_date:card_date && card_date,
                    card_number:card_number && card_number,
                    card_cvv:card_cvv && card_cvv
                }
            }
        )

        user.modifiedCount === 0 ? res.json('not update') : res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = editProfile