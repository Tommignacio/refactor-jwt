import { Router } from 'express'
import { errorCart } from '../middlewares/middlewares.cart/errorCart.middleware.js'
import { cartExist } from '../middlewares/middlewares.cart/cartExist.middleware.js'
import { existProduct } from '../middlewares/middlewares.product/existProduct.middleware.js'
import { errorProduct } from '../middlewares/middlewares.product/errorProduct.middleware.js'
import { addProductInCart, createCart, getCart } from '../controllers/CartController.js'

const router = Router()

router.post('/', createCart)

//devuelve carrito por su id
router.get('/:cid', cartExist, errorCart, getCart)

//cartExist, noCartError, existProduct, errorProduct son middlewares
router.post('/:cid/product/:pid', cartExist, errorCart, existProduct, errorProduct, addProductInCart)

export default router
