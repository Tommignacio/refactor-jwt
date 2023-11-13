/*global io*/
/*eslint-disable no-undef*/

import { io } from 'socket.io-client'

const socket = io()

export const loadMessages = callback => {
    socket.on('server:loadMessages', callback)
}

export const saveMessage = (user, message) => {
    socket.emit('client:newMessage', { user, message })
}

export const onNewMessage = callback => {
    socket.on('server:newMessage', callback)
}

export const deleteMessage = id => {
    socket.emit('client:deleteMessage', id)
}

export const getMsgById = id => {
    socket.emit('client:getMsg', id)
}

//trae nuevo  msg
export const onSelected = callback => {
    socket.on('server:selectedMsg', callback)
}

export const updateMsg = (id, user, message) => {
    socket.emit('client:updateMsg', {
        _id: id,
        user,
        message,
    })
}
