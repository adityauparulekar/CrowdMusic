import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Room from './components/room';
// import Contact from './components/views/contact';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Room} />
    {/* <Route path='contact' component={Contact} /> */}
    <Route path='*' component={Home} />
  </Route>
);