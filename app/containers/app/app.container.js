import React from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';

import Home from '../home/home.container';
import NoMatch from '../no-match/no-match.container';
import Page1 from '../page1/page1.container';
import Page2 from '../page2/page2.container';

import Header from '../../components/header/header.component';

import './app.container.scss';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

// this exposes history methods
// https://reacttraining.com/react-router/web/api/history
// https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(App);
