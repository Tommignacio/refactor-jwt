import ManagerMongoDb from './ManagerMongoDd.js'
import { Product } from '../../models/Product.models.js'

export class ProductMongoDb extends ManagerMongoDb {
    constructor() {
        super(Product)
    }
}
