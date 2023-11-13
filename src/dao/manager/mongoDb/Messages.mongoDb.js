import { Messages } from '../../models/Messages.models.js'
import ManagerMongoDb from './ManagerMongoDd.js'

export class MessagesMongoDb extends ManagerMongoDb {
    constructor() {
        super(Messages)
    }
}
