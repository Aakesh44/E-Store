const User = require('../model/users')

async function likeProduct(req,res) {

    try {

        const userId = req.body.userId
        const productId = req.body.productId 

        // console.log(userId);
        // console.log(productId);
        
        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { likedProducts: productId } },
            { new: true }
        )

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }       

        if (!userProfile.likedProducts.includes(productId)) {
            return res.status(400).json({ message: 'product not liked',userProfile });
        }

        res.json({ message: 'product liked successfully', userProfile });
        // console.log('liked',userProfile);
        
          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

async function dislikeProduct(req,res) {
    
    try {
        const userId = req.body.userId 
        const productId = req.body.productId 
        // console.log('stage 1');

        const userProfile = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedProducts: productId } },
            {new: true }
        )

        if (!userProfile) {
            // console.log('no user');
            return res.status(404).json({ message: 'User not found' });
        }       

        if (userProfile.likedProducts.includes(productId)) {
            // console.log('song illa');
            return res.status(400).json({ message: 'product not disliked',userProfile });
        }

        res.json({ message: 'product disliked successfully', userProfile });
        // console.log('disliked',userProfile);

          
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)

    }
}

module.exports = {likeProduct,dislikeProduct}