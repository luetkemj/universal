import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import style from './home.container.scss';

export default function Home() {
  return (
    <h1 className={style.heading}>
      Home
      {
        <Query
          query={gql`
            {
              rates(currency: "USD") {
                currency
                rate
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.rates.map(({ currency, rate }) => (
              <div key={currency}>
                <p>{`${currency}: ${rate}`}</p>
              </div>
            ));
          }}
        </Query>
      }
    </h1>
  );
}
