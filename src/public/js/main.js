import { loadMessages, onNewMessage, onSelected } from './socket.js'
import { appendMessage, fillForm, onHandleSubmit, renderMessages } from './ui.js'

onNewMessage(appendMessage)
loadMessages(renderMessages)
onSelected(fillForm)

const chatForm = document.querySelector('#chatForm')
chatForm.addEventListener('submit', onHandleSubmit)
