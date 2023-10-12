import { Router } from 'express'
import ProductAPI from '../API/ProductApi.js'
import { existProduct } from '../middlewares/middlewares.product/existProduct.middleware.js'
import { errorProduct } from '../middlewares/middlewares.product/errorProduct.middleware.js'
import { errorIncompleteProductProperties } from '../middlewares/middlewares.product/errorIncompleteProductProperties.middlewares.js'
import { incompleteProperties } from '../middlewares/middlewares.product/incompleteProperties.middlewares.js'

const router = Router()

export const productApi = new ProductAPI() //instancio la clase para usar sus metodos y la exporto para usarla en otras partes de la app (las usaremos en los middlewares y en cart.routes)

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        let products = await productApi.getAll()
        if (limit) {
            products = products.slice(0, +limit)
        }
        res.status(200).json({ 'products: ': products })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

//existProduct, errorProduct son middlewares
router.get('/:pid', existProduct, errorProduct, async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productApi.getById(+pid)
        res.status(200).json({ 'product: ': product })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
})

//incompleteProperties, errorIncompleteProductProperties son middlewares
router.post('/', incompleteProperties, errorIncompleteProductProperties, async (req, res) => {
    try {
        let product = req.body
        const newProd = await productApi.save(product)
        if (!product.status) {
            newProd.status = true
        }
        res.status(200).json({ message: 'Product added successfully', product: newProd })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

router.put('/:pid', existProduct, errorProduct, async (req, res) => {
    try {
        const newProduct = req.body
        const { pid } = req.params
        const product = await productApi.getById(+pid)
        const updatedProduct = Object.assign({}, product, newProduct) //une y/o reemplaza las propiedades repetidas
        await productApi.update(+pid, updatedProduct)
        res.status(200).json({ message: 'Product updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

router.delete('/:pid', existProduct, errorProduct, async (req, res) => {
    try {
        const { pid } = req.params
        await productApi.deleteById(+pid)
        res.status(200).json({ message: 'Product deleted successfully', id: pid })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
