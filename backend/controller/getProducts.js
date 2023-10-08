const Products = require('../model/products')

async function getAllProducts(req,res) {
    
    try {
        const products =await Products.find()
        if(!products) {res.json('failed') ;return }
        res.json(products)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {getAllProducts}