import React, { Component } from "react";
import '../../stylesheets/room.scss';

export default class Room extends Component {
  constructor(props) {
    super(props);
    const room = document.cookie.split(/[=;]/);
    this.room_id = room[1];
    this.username=room[3];
  }
  addsong(e) {
    const song_url = "http://localhost:5000/add_song";//CHANGE URL TO WHATEVER
    e.preventDefault();
    const song = document.getElementById("add_song").value;
    const username = this.username;
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
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      room_id: this.room_id,
      song_name: song,
    }));
  }
  render() {
    console.log(this)
    return (
      <div className="Room">

      <title>
    Room
  </title>
  <div className="header">
    ROOM: {this.room_id} {this.username}
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
        <button onClick={(e) => this.addsong(e)}>Add To Queue</button>
      </form>

    </div>

  </div>
  </div>
    );
  }
}


