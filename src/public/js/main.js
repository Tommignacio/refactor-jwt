document.addEventListener('DOMContentLoaded', async () => {
    const socketModule = await import('./socket.js')
    const uiModule = await import('./ui.js')

    const { loadMessages, onNewMessage, onSelected } = socketModule
    const { appendMessage, fillForm, onHandleSubmit, renderMessages } = uiModule

    onNewMessage(appendMessage)
    loadMessages(renderMessages)
    onSelected(fillForm)

    const chatForm = document.querySelector('#chatForm')
    chatForm.addEventListener('submit', onHandleSubmit)
})
