import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// function App() {
//   return (
// <html>
//   <title>
//     Login
//   </title>
//   <div class="header">
//     Crowd Music
//   </div>
//   <link href="../../static/login.css" rel="stylesheet" type="text/css" />
//   <script type="text/javascript" src="login.js"></script>
//   <div class="login-page">
//     <div class="split left">
//       <div class="text">
//         Create a room and add music!
//       </div>
//       <form class="login-form">
//         <input type="text" placeholder="username" id="create_username" />
//         <button onClick="create()">create room</button>
//       </form>
//     </div>
//     <div class="split right">
//       <div class="text">
//         Join a room and add music with your friends!
//       </div>
//       <form class="login-form">
//         <input type="text" placeholder="username" id="join_username" />
//         <input type="text" placeholder="room id" id="join_roomid" />
//         <button onClick="join()">join room</button>
//       </form>
//     </div>
//   </div>
// </html>

//   );
// }

export default App;
