import { Cart } from '../../models/Cart.models.js'
import ManagerMongoDb from './ManagerMongoDd.js'

export class CartMongodb extends ManagerMongoDb {
    constructor() {
        super(Cart)
    }

    async addProduct(cart, pid) {
        try {
            const existingProductIndex = cart.products.findIndex(item => item.product.equals(pid))

            if (existingProductIndex === -1) {
                const newProduct = { product: pid, quantity: 1 }
                cart.products.push(newProduct)
            } else {
                cart.products[existingProductIndex].quantity++
            }
            await cart.save(cart)
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo agregar el producto al carrito')
        }
    }
}
