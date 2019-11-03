import React, { Component } from "react";
import '../../stylesheets/host.scss';

export default class Host extends Component {
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
      return (
      <div className="Host">
    <title>
    HOST
  </title>
  <div className="header"> HOST </div>
  <div className="room_details"> Room Host: </div>
  <div className="room_details"> <script>getHostName()</script> </div>
  <div className="room_details"> Your Name: </div>
  <div className="room_details"> <script>getUserName()</script> </div>
  <div className="host-page">

    <div className="song cs">
      <div className="song_text">
        CURRENT SONG
      </div>
      <div className="song_text">
        <script>getCurrentSong()</script>
      </div>
    </div>

    <iframe className = "video" width="50" height="50" src="https://www.youtube.com/embed/JohcbfO0OjA?&autoplay=1" frameborder="0" allow="autoplay"></iframe>
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
      )
  }
}


