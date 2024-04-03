
const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

socket.on('chat-message', data =>{
    appendMessage(data)
})

socket.on('output-messages', data =>{
    if (data.length){
        data.forEach(message=> {
            appendMessage(message.message)
        })
    }
})

messageForm.addEventListener('submit',e =>{
    e.preventDefault()
        const message = messageInput.value

        appendMessage('You: '+ message )

        // const messageElement = document.createElement('div')    // yo part -> self message dekhauna 
        // messageElement.innerText = message
        // messageContainer.append(messageElement)
    

        socket.emit('send-chat-message', message)        // emits aru socket lai matra (server ma pathayo)
        messageInput.value = ''     // message lekheny thau lai clear gareko
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
    
