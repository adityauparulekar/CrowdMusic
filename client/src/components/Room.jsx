import React from 'react';
import '../stylesheets/App.css';

function Room() {
  return (
    <div className="Room">
    <title>
      Login
    </title>
  <div className="header">
    Crowd Music
  </div>
  <link href="../../static/login.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="../../templates/login.js"></script>
  <div className="login-page">
    <div className="split left">
      <div className="text">
        Create a room and add music!
      </div>
      <form className="login-form">
        <input type="text" placeholder="username" id="create_username" />
        <button onClick={(e) => create(e)}>create room</button>
      </form>
    </div>
    <div className="split right">
      <div className="text">
        Join a room and add music with your friends!
      </div>
      <form className="login-form">
        <input type="text" placeholder="room id" id="join_roomid" />
        <button onClick={(e) => join(e)}>join room</button>
      </form>
    </div>
  </div>
  </div>
  );
}

function create(e) {
  const create_url = "http://localhost:5000/create_room";
  e.preventDefault();
  //const username = document.getElementById("create_username").value;
  // console.log(username);
  const xhr = new XMLHttpRequest();
  // console.log(http);
  xhr.open("GET", create_url ); // false for synchronous request
  // http.setRequestHeader("Access-Control-Allow-Origin", "*");
  let room_id = "";
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        room_id = JSON.parse(xhr.responseText).room_id;
        console.log(room_id);
        window.location.href="http://localhost:3000/room";
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
}

function join(e) {
  e.preventDefault();
}
export default Room;
