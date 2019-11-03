import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Router, hashHistory as history } from 'react-router';
// import routes from './routes';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(
//     <Router routes={routes} history={history} />,
//     document.getElementById('root')
//   );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
