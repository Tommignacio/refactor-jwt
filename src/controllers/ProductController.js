//controlador: se comunica con el model de mongoose
'use strict'

import { ProductMongoDb } from '../dao/manager/mongoDb/Product.mongoDb.js'

export const productApi = new ProductMongoDb() //instancio la clase para usar sus metodos y la exporto para usarla en otras partes de la app (las usaremos en los middlewares y en cart.routes)

export const getProducts = async (req, res) => {
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
}

export const getProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productApi.getOne(pid)
        res.status(200).json({ 'product: ': product })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

export const addProduct = async (req, res) => {
    try {
        let product = req.body
        const newProd = await productApi.create(product)
        if (!product.status) {
            newProd.status = true
        }
        res.status(200).json({ message: 'Product added successfully', product: newProd })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const newProduct = req.body
        await productApi.update(pid, newProduct)
        res.status(200).json({ message: 'Product updated successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        await productApi.delete(pid)
        res.status(200).json({ message: 'Product deleted successfully', id: pid })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}
