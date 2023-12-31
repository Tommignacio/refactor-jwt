'use strict'

import { cartApi } from './CartController.js'

export const getCartPaginate = async (req, res) => {
    try {
        const { cid } = req.params
        const { limit, page, type, sort } = req.query
        const cart = await cartApi.getOne(cid)
        let products = await cartApi.updateProductsPage(cart, limit, page, type, sort)
        console.log((products))
        res.render('carts', {
            layout: 'main',
            title: 'Cart',
            products: products.payload,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            limit,
            type,
            sort,
            cartId:cart._id
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}