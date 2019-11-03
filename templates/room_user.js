
function create() {
   var socket = io();
   console.log(document.getElementById("create_username").value);
   socket.emit("create_room", {username: document.getElementById("create_username").value});
}

function join() {

}