import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Room from './components/views/room';
import Host from './components/views/host'
export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='room' component={Room} />
    <Route path='host' component={Host} />
    {/* <Route path='*' component={Home} /> */}
  </Route>
);