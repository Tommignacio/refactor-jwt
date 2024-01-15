'use strict'

import { productApi } from './ProductController.js'
export const getProductsPaginate = async (req, res) => {
    try {
        const { limit, page, type, sort } = req.query
        let products = await productApi.getPaginate(limit, page, type, sort)
        const sessionUser = req.session.user
        console.log({ sessionUser })
        res.render('products', {
            layout: 'main',
            title: 'Products',
            products: products.payload,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            limit,
            type,
            sort,
            sessionUser,
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}
