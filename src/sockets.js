import { messagesApi } from './controllers/ChatController.js'

//socket del servidor

export default io => {
    io.on('connection', socket => {
        console.log('New user connected')

        //carga msg
        const emitMsg = async () => {
            const messages = await messagesApi.getAll()
            io.emit('server:loadMessages', messages)
        }
        emitMsg()

        socket.on('client:newMessage', async data => {
            const savedMessage = await messagesApi.create(data)
            io.emit('server:newMessage', savedMessage)
        })

        socket.on('client:deleteMessage', async id => {
            await messagesApi.delete(id)
            emitMsg() //devuelvo arreglo de msg
        })

        socket.on('client:getMsg', async id => {
            const message = await messagesApi.getOne(id)
            io.emit('server:selectedMsg', message)
        })

        socket.on('client:updateMsg', async updatedMsg => {
            await messagesApi.update(updatedMsg._id, {
                user: updatedMsg.user,
                message: updatedMsg.message,
            })
            emitMsg()
        })
    })
}
