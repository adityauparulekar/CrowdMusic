import React, { Component } from "react";
import '../../stylesheets/room.scss';

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
        console.log(room_id);
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

export default class Room extends Component {
  

  render() {
    return (
      <div className="Room">

      <title>
    Room
  </title>
  <div class="header">
    ROOM
  </div>
  <link href="../../stylesheets/room.scss" rel="stylesheet" type="text/css"/>
  {/* <script type="text/javascript" src="room_user.js"></script> */}
  <div class="room_user-page">

    <div class="song cs">
      <div class="song_text">
        CURRENT SONG
      </div>
    </div>


    <div class="song q">
      <div class="song_text">
        SONG QUEUE
      </div>
    </div>
    
    <div class="song add">
      <div class="song_text">
        ADD SONG
      </div>
      <form class="add_song-form">
        <input type="song_text" placeholder="Song Name" id="add_song" />
        <button onClick="____()">Add To Queue</button>
      </form>

    </div>

  </div>
  </div>
    );
  }
}