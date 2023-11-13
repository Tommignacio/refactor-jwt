'use strict'

import { CartMongodb } from '../dao/manager/mongoDb/Cart.mongoDb.js'

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
        res.status(200).json({ 'products: ': cart.products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const addProductInCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await cartApi.getOne(cid)
        await cartApi.addProduct(cart, pid)
        res.status(200).json({ message: 'added product' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}
