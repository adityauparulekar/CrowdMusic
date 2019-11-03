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
          console.log("ASDASDASDDASDASD" + xhr.responseText);
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
  componentDidMount() {
    this.interval = setInterval(() => {
      const url = "http://localhost:5000/song_queue";
      this.setState({ time: Date.now() });
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url); // false for synchronous request
      xhr.onload = (function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          const response = JSON.parse(xhr.responseText);
          this.song_queue = response.result;
        } else {
          console.error(xhr.statusText);
        }
      }
    }).bind(this);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(this.room_id);
    xhr.send(JSON.stringify({
      room_id: this.room_id,
    }));
    this.rando();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  rando() {
    var songs = this.song_queue;

    var ul = document.getElementById("YOLOSWAGGINS");
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    console.log(ul);
    for (var i = 0; i < songs.length; i++) {
      var topping = songs[i];

      var listItem = document.createElement("button");
      console.log("TOPPING" + topping);
      listItem.textContent = topping[0] + ": " + topping[1];
      listItem.onclick = (function() {
        const url = "http://localhost:5000/song_vote";
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onload = (function(e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              if (response.error !== "none") {
                alert(response.error);
              }
            } else {
              console.error(xhr.statusText);
            }
          }
        }).bind(this);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        const data = {
          room_id: this.room_id,
          username: this.username,
          song_name: topping[0],
        }
        console.log(data);
        xhr.send(JSON.stringify(data));
      }).bind(this);
      ul.appendChild(listItem);
    }
  }
  render() {
    return (
      <div className="Room">

      <title>
    Room
  </title>
  <div className="header">
    ROOM:
  </div>
  <div className="header">
    {this.room_id}
  </div>
  <div className="header">
    User: {this.username}
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
      <div className="song_text" id="YOLOSWAGGINS">
        SONG QUEUE
        <div className="songlist">
          Hello
        </div>
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


