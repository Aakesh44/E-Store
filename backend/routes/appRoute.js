const express = require('express')
const router = express.Router()

const createProduct = require('../controller/createProduct')
const getProducts = require('../controller/getProducts')
const validationReq = require('../middleware/validationReq')
const logInCount = require('../controller/logInCount')
const signInCount = require('../controller/signInCount')
const editProfile = require('../controller/editProfileCont')
const getUser = require('../controller/getUser')
const productlike = require('../controller/likePoduct')
const cartProduct = require('../controller/cartProduct')
const orderPlace = require('../controller/orderProduct')


router.route('/create-product').post(createProduct)
router.route('/products').get(getProducts.getAllProducts)

router.route('/log-in').post(
    logInCount
)

router.route('/sign-up').post(
    validationReq.requestBody,
    validationReq.requestValid,
    signInCount
)

router.route('/user/:id').get(
    getUser
)

router.route('/editProfile').put(editProfile)

router.route('/like').put(productlike.likeProduct)
router.route('/dislike').put(productlike.dislikeProduct)

router.route('/addToCart').put(cartProduct.addToCart)
router.route('/removeFromCart').put(cartProduct.removeFromCart)

router.route('/orderPlace').post(orderPlace.orderPlaced)
router.route('/fetchOrder/:id').get(orderPlace.fetchOrder)

module.exports = router