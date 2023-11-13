'use strict'

import { MessagesMongoDb } from '../dao/manager/mongoDb/Messages.mongoDb.js'

export const messagesApi = new MessagesMongoDb()

export const getChat = async (req, res) => {
    res.render('chat', {
        layout: 'main',
        title: 'pagina chat',
    })
}
