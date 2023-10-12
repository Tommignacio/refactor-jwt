import ContainerAPI from './ContainerAPI.js'

//clase hija hereda de conainer sus metodos y atributos
export default class ProductApi extends ContainerAPI {
    constructor() {
        super('products') //envia el nombre del archivo exclusivo para productos
    }
}
