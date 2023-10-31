const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    productsId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products",
            required:true,
        }
    ],

    // count:{type:Number,required:true},
    price:{type:Number,required:true},
    date:{
        type:Date,
        default:Date.now(),
        immutable:true
    }
}
)

module.exports = mongoose.model("Orders",orderSchema,"orders")