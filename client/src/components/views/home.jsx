import React, { Component } from "react";
import { browserHistory } from 'react-router';

import '../../stylesheets/app.scss';

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
        console.log(xhr.responseText);
        room_id = JSON.parse(xhr.responseText).room_id;
        window.location.href="http://localhost:3000/room";
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
}

function join(e) {
  const create_url = "http://localhost:5000/join_room";
  e.preventDefault();
  const username = document.getElementById("join_username").value;
  const room = document.getElementById("join_roomid").value;
  // console.log(username);
  const xhr = new XMLHttpRequest();
  // console.log(http);
  xhr.open("GET", create_url ); // false for synchronous request
  // http.setRequestHeader("Access-Control-Allow-Origin", "*");
  let room_id = "";
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        room_id = JSON.parse(xhr.responseText).room_id;

        window.location.href="http://localhost:3000/room";
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  const data = {
    username,
    room_id: room
  }
  xhr.send(data);

}

export default class Home extends Component {

  componentDidMount() {
    browserHistory.push('/');
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
          <button onClick={(e) => create(e)}>create room</button>
        </form>
      </div>
      <div className="split right">
        <div className="text">
          Join a room and add music with your friends!
        </div>
        <form className="login-form">
          <input type="text" placeholder="username" id="join_username" />
          <input type="text" placeholder="room id" id="join_roomid" />
          <button onClick={(e) => join(e)}>join room</button>
        </form>
      </div>
    </div>
    </div>
    );
  }
}