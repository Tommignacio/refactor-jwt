import ManagerFs from './ManagerFs.js'

//clase hija hereda de container sus metodos y atributos
export default class CartFs extends ManagerFs {
    constructor() {
        super('cart') //envia el nombre del archivo exclusivo para carrito
    }

    //metodos exlcusivos para cart

    //crea carrito
    async createCart() {
        return {
            products: [],
        }
    }

    //agraga producto a carrito
    async addProduct(cart, pid) {
        try {
            let i = cart.products.length
            while (i > 0 && cart.products[i - 1].product != +pid) {
                i--
            } //i saldra 0 si no encontro el producto en el array

            if (i === 0) {
                //agrego el nuevo producto
                cart.products.push({ product: +pid, quantity: 1 })
                await this.update(cart.id, cart) //actualiza el json
            } else {
                //actualiza quantity del producto encontrado
                cart.products[i - 1].quantity++
                await this.update(cart.id, cart)
            }
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo agregar el producto al carrito')
        }
    }
}
