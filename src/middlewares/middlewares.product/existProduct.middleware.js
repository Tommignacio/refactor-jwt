import { productApi } from '../../controllers/ProductController.js'

export const existProduct = async function (req, res, next) {
    const allProducts = await productApi.getAll()
    for (const i of allProducts) {
        if (i.id === req.params.pid) {
            return next() //si no hay error, continua
        }
    }
    next('error') //le paso el error si no encontro el producto
}
