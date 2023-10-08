const User = require('../model/users')

async function getUser(req,res){

    try {
        
        const user = await User.findOne({_id:req.params.id})
        if(!user){
           return res.json('not found')
        }

        res.json(user)
    } catch (error) {
        res.status(500).json(`Error:${error.message}`)
    }
}

module.exports = getUser