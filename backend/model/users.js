const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

    username:String,
    email:{type:String,unique:true},
    password:String,
    dist:String,
    area:String,
    pincode:Number,
    landmark:String,
    phone:Number,
    card_name:{ type:String,default:null},
    card_number:{ type:Number,default:null},
    card_date:{ type:String,default:null},
    card_cvv:{ type:Number,default:null},
    likedProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        }
    ],
    cartProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products'
        }
    ]
})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

module.exports = mongoose.model('Users',userSchema,'users')