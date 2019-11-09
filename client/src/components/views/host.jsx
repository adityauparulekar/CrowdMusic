import React, { Component } from "react";
import '../../stylesheets/host.scss';

export default class Host extends Component {
  constructor(props) {
    super(props);
    const room = document.cookie.split(/[=;]/);
    console.log(room);
    this.room_id = room[1];
    this.username=room[3];
    this.count = 0;
    this.duration = 30;
    this.songurl = "https://www.youtube.com/embed/JohcbfO0OjA?&autoplay=1";
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
  componentDidMount() {
    this.interval = setInterval(() => {
        this.count += 1;
        this.setState({ time: Date.now() });
        if (this.count > this.duration) {
            const url = "http://localhost:5000/get_song";
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url); // false for synchronous request
            xhr.onload = (function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    const response = JSON.parse(xhr.responseText);
                    this.duration = response.duration;
                    this.count = 0;
                    this.songurl = response.song_url;
                    console.log("ASDASDASDASDASDASDASD" + this.songurl);
                    this.updateVid();
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
        }
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
  updateVid() {
    var vid = document.getElementById("VIDEO");
    vid.src = this.songurl;
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
      <div className="Host">
    <title>
    HOST
  </title>
  <div className="header"> HOST </div>
  <div className="room_details"> Room ID: {this.room_id}</div>
  <div className="room_details"> <script>getHostName()</script> </div>
  <div className="room_details"> Your Name: {this.username}</div>
  <div className="room_details"> <script>getUserName()</script> </div>
  <div className="host-page">

    <div className="song cs">
      <div className="song_text">
        CURRENT SONG
        
      </div>
      <iframe className = "video" width="20" height="20" src="https://www.youtube.com/embed/JohcbfO0OjA?&autoplay=0" align="center" frameborder="0" allow="autoplay" id="VIDEO"></iframe>
    </div>

    <div className="song q">
      <div className="song_text" id="YOLOSWAGGINS">
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


