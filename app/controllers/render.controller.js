import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import { Router } from 'react-router';
import { renderToString } from 'react-dom/server';

import App from '../containers/app/app.container';

export default function render(req, res, next) {
  // create a new history on each (server side) request
  const history = createMemoryHistory(req.url);

  try {
    const htmlContent = renderToString(
      <Router history={history} location={req.url} context={{}}>
        <App />
      </Router>,
    );

    // return the rendered index page with included HTML content
    return res.render('index', {
      htmlContent,
    });
  } catch (err) {
    return next(err);
  }
}
