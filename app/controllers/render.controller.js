import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import { Router } from 'react-router';
import { renderToString } from 'react-dom/server';
import fetch from 'isomorphic-fetch';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';

import App from '../containers/app/app.container';

export default function render(req, res, next) {
  // create a new history on each (server side) request
  const history = createMemoryHistory(req.url);

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: 'http://localhost:3010',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  try {
    const htmlContent = renderToString(
      <ApolloProvider client={client}>
        <Router history={history} location={req.url} context={{}}>
          <App />
        </Router>
      </ApolloProvider>,
    );

    // https://redux.js.org/recipes/server-rendering#security-considerations
    const apolloState = JSON.stringify(client.extract()).replace(/</g, '\\u003c');

    // return the rendered index page with included HTML content
    return res.render('index', {
      htmlContent,
      apolloState,
    });
  } catch (err) {
    return next(err);
  }
}
