'use strict'

import { CartMongodb } from '../dao/manager/mongoDb/Cart.mongoDb.js'
import { productApi } from './ProductController.js'

export const cartApi = new CartMongodb()

export const createCart = async (req, res) => {
    try {
        const newCart = await cartApi.create({})
        res.status(200).json({ message: `cart id: ${newCart.id} created succesfully` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const getCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartApi.getOne(cid)
        console.log(cart.products)
        res.status(200).json({ 'products: ': cart.products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const addProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartApi.getOne(cid)
        await cartApi.addProduct(cart, pid)
        res.status(200).json({ message: 'added product' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartApi.getOne(cid)
        await cartApi.deleteProduct(cart, pid)
        res.status(200).json({ message: 'deleted product' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const updateProductsPaginate = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const productsPag = await productApi.getPaginate(undefined, undefined, undefined, undefined)
    } catch (error) {}
}
