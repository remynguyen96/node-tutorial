var socket = io();
var chatUsername = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');
socket.on('connect',()=>{
  var chatForm = document.forms.chatForm;
  if(chatForm){
    chatForm.addEventListener('submit',function(e){
      e.preventDefault();
      var data = {
        username: chatUsername.value,
        message: chatMessage.value,
      }
      socket.emit('postMessage',data);
      showMessage({
        username: chatUsername.value,
        message: chatMessage.value
      });
      chatMessage.value = '';
      chatMessage.focus();
    });

    socket.on('updateMessage',(data) => {
      showMessage(data);
    });
  }
});

function showMessage(data){
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage = document.createElement('p');
  if(chatUsername.value == data.username){
    newMessage.className = 'bg-danger text-danger chat-text';
  }else{
    newMessage.className = 'bg-primary chat-text';
  }
  newMessage.style.padding = '10px 20px';
  newMessage.innerHTML = `<strong>${data.username}: </strong> ${data.message}`;
  chatDisplay.insertBefore(newMessage,chatDisplay.firstChild);
}
