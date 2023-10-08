const User = require('../model/users')
const Order = require('../model/orders')

async function orderPlaced(req,res) {

    try {

        const userId = req.body.userId
        const productId = req.body.productId 
        const count = req.body.count
        const price = req.body.price 

        const orders = await Order.create(
            {
                userId:userId,
                productId:productId,
                count:count,
                price:price
            }
        )
        
        const order = await Order.findOne({userId:userId})

        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }       

        res.json({ message: 'order placed', order });
        // console.log('liked',userProfile);
        
          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

async function fetchOrder(req,res) {
    
    try {
        
        const userId = req.params.id 

        const orders = await Order.find({userId:userId})

        res.json(orders);

    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }

}

module.exports = {orderPlaced,fetchOrder}