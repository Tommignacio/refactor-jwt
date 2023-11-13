'use strict'
import { Router } from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/ProductController.js'
import { existProduct } from '../middlewares/middlewares.product/existProduct.middleware.js'
import { errorProduct } from '../middlewares/middlewares.product/errorProduct.middleware.js'

const router = Router()

router.get('/', getProducts)

//existProduct, errorProduct son middlewares
router.get('/:pid', existProduct, errorProduct, getProduct)

router.post('/', addProduct)

router.put('/:pid', existProduct, errorProduct, updateProduct)

router.delete('/:pid', existProduct, errorProduct, deleteProduct)

export default router
