const User = require('../model/users')

async function addToCart(req,res) {

    try {

        const userId = req.body.userId
        const productId = req.body.productId 


        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { cartProducts: productId } },
            { new: true }
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }       

        if (!userProfile.cartProducts.includes(productId)) {
            return res.status(400).json({ message: 'product not added in cart',userProfile });
        }

        res.json({ message: 'product added to cart successfully', userProfile });
        // console.log('liked',userProfile);
        
          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

async function removeFromCart(req,res) {
    
    try {
        const userId = req.body.userId 
        const productId = req.body.productId 
        // console.log('stage 1');

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { cartProducts: productId } },
            {new: true }
        )

        if (!userProfile) {
            // console.log('no user');
            return res.status(404).json({ message: 'User not found' });
        }       

        if (userProfile.cartProducts.includes(productId)) {
            // console.log('song illa');
            return res.status(400).json({ message: 'product not remove from cart',userProfile });
        }

        res.json({ message: 'product remove from cart successfully', userProfile });
        // console.log('disliked',userProfile);

          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

module.exports = {addToCart,removeFromCart}