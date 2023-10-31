const User = require('../model/users')
const Order = require('../model/orders')

async function orderPlaced(req,res) {

    try {

        const userId = req.body.userId
        const productsId = req.body.productsId 
        const price = req.body.price 

        const placeOrder = await Order.create(
            {
                userId:userId,
                productsId:productsId,
                price:price
            }
        )
        
        const order = await Order.findById(placeOrder._id).populate("productsId")

        if (!order) {
            return res.status(404).json({ message: 'orders not found' });
        }       

        res.status(200).json( order );
        // console.log('liked',userProfile);
        
          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

async function fetchOrder(req,res) {
    
    try {
        
        const userId = req.params.id 

        const orders = await Order.find({userId:userId}).populate("productsId")

        res.status(200).json(orders);

    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }

}

module.exports = {orderPlaced,fetchOrder}