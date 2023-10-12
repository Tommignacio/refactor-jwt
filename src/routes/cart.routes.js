import { Router } from 'express'
import CartApi from '../API/CartApi.js'
import { errorCart } from '../middlewares/middlewares.cart/errorCart.middleware.js'
import { cartExist } from '../middlewares/middlewares.cart/cartExist.middleware.js'
import { existProduct } from '../middlewares/middlewares.product/existProduct.middleware.js'
import { errorProduct } from '../middlewares/middlewares.product/errorProduct.middleware.js'

const router = Router()
export const cartApi = new CartApi()

router.post('/', async (req, res) => {
    try {
        const cart = await cartApi.createCart()
        await cartApi.save(cart)
        res.status(200).json({ message: 'cart created succesfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/:cid', cartExist, errorCart, async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartApi.getById(+cid)
        res.status(200).json({ 'products: ': cart.products }) //array de objetos product
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

//cartExist, noCartError, existProduct, errorProduct son middlewares
router.post('/:cid/product/:pid', cartExist, errorCart, existProduct, errorProduct, async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await cartApi.getById(+cid)
        await cartApi.addProduct(cart, +pid)
        res.status(200).json({ message: 'added product' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
