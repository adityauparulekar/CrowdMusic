
const create_url = "localhost:1232/create_room";
function create() {
   const username = document.getElementById("create_username").value;
   const http = new XMLHttpRequest();
   http.open("GET", create_url ); // false for synchronous request
   http.send(null);
   console.log(http.responseText);
}

function join() {


}