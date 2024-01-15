import userModel from '../../models/User.models.js'
import ManagerMongoDb from './ManagerMongoDd.js'

export class UserMongoDd extends ManagerMongoDb {
    constructor() {
        super(userModel)
    }

    async findUserByEmailPassw(email, password) {
        try {
            const user = await this.collection.findOne({ email, password })
            return user
        } catch (error) {
            throw new Error('Error: ' + err)
        }
    }
}
