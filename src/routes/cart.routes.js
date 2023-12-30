'use strict'
import { Router } from 'express'
import { errorCart } from '../middlewares/middlewares.cart/errorCart.middleware.js'
import { cartExist } from '../middlewares/middlewares.cart/cartExist.middleware.js'
import { existProduct } from '../middlewares/middlewares.product/existProduct.middleware.js'
import { errorProduct } from '../middlewares/middlewares.product/errorProduct.middleware.js'
import { addProductInCart, createCart, deleteProductInCart, deleteProductsInCart, getCart, updateProductsPaginate, updateQuantityProduct } from '../controllers/CartController.js'

const router = Router()

router.post('/', createCart)

//devuelve carrito por su id
router.get('/:cid', cartExist, errorCart, getCart)

//cartExist, noCartError, existProduct, errorProduct son middlewares
router.post('/:cid/product/:pid', cartExist, errorCart, existProduct, errorProduct, addProductInCart)

router.put("/:cid", cartExist, errorCart, updateProductsPaginate )

router.put('/:cid/products/:pid', cartExist, errorCart, updateQuantityProduct )

router.delete('/:cid/products/:pid', cartExist, errorCart, existProduct, errorProduct, deleteProductInCart)

router.delete('/:cid', cartExist, errorCart, deleteProductsInCart)

export default router
