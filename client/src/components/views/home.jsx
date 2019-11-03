import React, { Component } from "react";
import { browserHistory } from 'react-router';

import '../../stylesheets/app.scss';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnload = (event, xhr) => {
      console.log(xhr.responseText);
      const room_id = JSON.parse(xhr.responseText).result.room_id;
      document.cookie = "room="+ room_id;
      // document.cookie+= "=username=" + username;
      window.location.href="http://localhost:3000/room";
    }
  }
  componentDidMount() {
    browserHistory.push('/');
  }
  create(e) {
    const create_url = "http://localhost:5000/create_room";
    e.preventDefault();
    const username = document.getElementById("create_username").value;
    // console.log(username);
    const xhr = new XMLHttpRequest();
    // console.log(http);
    xhr.open("GET", create_url ); // false for synchronous request
    // http.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = (function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.handleOnload(e, xhr)
        } else {
          console.error(xhr.statusText);
        }
      }
    }).bind(this);
    xhr.send(null);
  }
  
  join(e) {
    const create_url = "http://localhost:5000/join_room";
    e.preventDefault();
    const username = document.getElementById("join_username").value;
    const room = document.getElementById("join_roomid").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", create_url ); // false for synchronous request
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          const json = JSON.parse(xhr.responseText);
          if(json.error === "none") {
            document.cookie = "room=" + room;
            document.cookie = "username=" + username;
            window.location.href="http://localhost:3000/room";
          }
          else {
            alert(json.error);
          }
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    const data = {
      username,
      room_id: room
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
  }
  render() {
    return (
      <div className="App">
      <title>
        Login
      </title>
    <div className="header">
      Crowd Music
    </div>
    {/* <link href="../../stylesheets/app.scss" rel="stylesheet" type="text/css" /> */}
    {/* <script type="text/javascript" src="../../templates/login.js"></script> */}
    <div className="login-page">
      <div className="split left">
        <div className="text">
          Create a room and add music!
        </div>
        <form className="login-form">
          <input type="text" placeholder="username" id="create_username" />
          <button onClick={(e) => this.create(e)}>create room</button>
        </form>
      </div>
      <div className="split right">
        <div className="text">
          Join a room and add music with your friends!
        </div>
        <form className="login-form">
          <input type="text" placeholder="username" id="join_username" />
          <input type="text" placeholder="room id" id="join_roomid" />
          <button onClick={(e) => this.join(e)}>join room</button>
        </form>
      </div>
    </div>
    </div>
    );
  }
}