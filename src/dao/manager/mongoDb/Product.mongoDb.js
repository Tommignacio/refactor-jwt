import ManagerMongoDb from './ManagerMongoDd.js'
import { Product } from '../../models/Product.models.js'

export class ProductMongoDb extends ManagerMongoDb {
    constructor() {
        super(Product)
    }

    async getPaginate(limit = 10, page = 1, type, sort) {
        try {
            const options = {
                page: +page,
                limit: +limit,
                lean: true //para que lea el objeto mongoose
            }
            const query = {}

            if (sort === 'asc' || sort === 'desc') {
                options.sort = { price: sort === 'asc' ? 1 : -1 }
            }

            if (type) {
                query.type = type
            }
            const result = await this.collection.paginate(query, options)
            console.log(result)
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
            res.status(500).json({ error: 'Server error' })
        }
    }
}
