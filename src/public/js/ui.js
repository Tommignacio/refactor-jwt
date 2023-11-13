import { saveMessage, deleteMessage, getMsgById, updateMsg } from './socket.js'

//funciones con interaccion de usuario

const messagesList = document.querySelector('#messages')
const user = document.querySelector('#user')
const message = document.querySelector('#message')
let savedId = ''

//funcion renderiza msg
const messageUi = message => {
    const div = document.createElement('div')
    div.innerHTML = ` 
        <div> 
            <h1>${message.user}</h1> 
            <button class="delete" data-id="${message._id}">Delete</button>
            <button class="update" data-id="${message._id}">Update</button>
            <p>${message.message}</p> 
        </div>`
    const btnDelete = div.querySelector('.delete')
    const btnUpdate = div.querySelector('.update')

    //recibe las funciones el id del data-id
    btnDelete.addEventListener('click', e => deleteMessage(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getMsgById(btnUpdate.dataset.id))

    return div
}

//renderiza msg
export const renderMessages = messages => {
    messagesList.innerHTML = ''
    messages.forEach(message => {
        messagesList.append(messageUi(message))
    })
}

//llenar formulario
export const fillForm = msg => {
    user.value = msg.user
    message.value = msg.message
    savedId = msg._id //agregamos el id existente ya que es un update
}

//maneja submit del form
export const onHandleSubmit = e => {
    e.preventDefault()

    //actualiza msg
    if (savedId) {
        updateMsg(savedId, user.value, message.value)
    } else {
        //guarda nuevo msg
        saveMessage(user.value, message.value)
    }
    //limpiamos campos
    savedId = ''
    user.value = ''
    message.value = ''
}

//añadir msg al front
export const appendMessage = msg => {
    messagesList.append(messageUi(msg))
}
