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
  <div className="header">
    ROOM
  </div>
  <link href="../../stylesheets/room.scss" rel="stylesheet" type="text/css"/>
  {/* <script type="text/javascript" src="room_user.js"></script> */}
  <div className="room_user-page">

    <div className="song cs">
      <div className="song_text">
        CURRENT SONG
      </div>
    </div>


    <div className="song q">
      <div className="song_text">
        SONG QUEUE
      </div>
    </div>
    
    <div className="song add">
      <div className="song_text">
        ADD SONG
      </div>
      <form className="add_song-form">
        <input type="song_text" placeholder="Song Name" id="add_song" />
        <button onClick={(e) => addsong(e)}>Add To Queue</button>
      </form>

    </div>

  </div>
  </div>
    );
  }
}

function addsong(e) {
  const song_url = "http://localhost:5000/add_song";//CHANGE URL TO WHATEVER
  e.preventDefault();
  const value = document.getElementById("add_song").value;
  console.log(value);
  //const username = document.getElementById("create_username").value;
  console.log(username);
  const xhr = new XMLHttpRequest();
  // console.log(http);
  xhr.open("POST", song_url); // false for synchronous request
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        const response = JSON.parse(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(JSON.stringify({
    song: value,
  }));
}
