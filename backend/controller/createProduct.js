const Products = require('../model/products')

async function createProduct(req,res) {
    
    try {
        
        const datas = await Products.insertMany(req.body)

        res.json(datas)

    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
    }
}

module.exports = createProduct