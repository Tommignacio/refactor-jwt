import userModel from '../../models/User.models.js'
import ManagerMongoDb from './ManagerMongoDd.js'

export class UserMongoDd extends ManagerMongoDb {
    constructor() {
        super(userModel)
    }

    async findUserByEmail(email) {
        try {
            const user = await this.collection.findOne({ email })
            return user
        } catch (error) {
            throw new Error('Error: ' + err)
        }
    }
}
