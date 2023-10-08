const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    img:String,
    rating:{
        rate:Number,
        count:Number
    }
})

module.exports = mongoose.model("Products",productSchema,'products')