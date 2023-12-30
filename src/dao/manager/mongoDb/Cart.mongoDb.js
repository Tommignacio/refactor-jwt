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
            await this.update(cart._id, cart)
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo agregar el producto al carrito')
        }
    }

    async deleteProduct(cart, pid) {
        try {
            let res
            const existingProductIndex = cart.products.findIndex(item => item.product.equals(pid))
            cart.products[existingProductIndex].quantity--
            if (cart.products[existingProductIndex].quantity === 0) {
                res = cart.products.filter(element => element.product._id != pid)
                cart.products = res
            }
            await this.update(cart._id, cart)
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo eliminar el producto al carrito')
        }
    }

    async deleteProducts(cart){
        try {
            cart.products=[]
            this.update(cart._id,cart)
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo eliminar los productos del carrito')
        }
      
    }

    async updateProductsPage(cart, limit = 10, page = 1, type, sort) {
        try {
            const options = {
                page: +page,
                limit: +limit,
            }
            const query = { _id: cart._id}

            if (sort === 'asc' || sort === 'desc') {
                options.sort = { price: sort === 'asc' ? 1 : -1 }
            }

            if (type) {
                query.type = type
            }
            const result = await this.collection.paginate(query, options)
            return {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevPage,
                nextLink: result.nextPage,
            }
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo actualizar los productos del carrito')
        }
    }

    async updateProductQuantity(cart,pid,quantity){
        try {
            const pos = cart.products.findIndex(el=>el.product._id.equals(pid))
            cart.products[pos].quantity = quantity
            await this.update(cart._id, cart)
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo actualizar el producto del carrito')
        }
       
    }
}
