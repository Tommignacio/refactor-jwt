import ManagerFs from './ManagerFs.js'

//clase hija hereda de conainer sus metodos y atributos
export default class ProductFs extends ManagerFs {
    constructor() {
        super('products') //envia el nombre del archivo exclusivo para productos
    }
}
