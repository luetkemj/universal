import React from 'react';

import style from './no-match.container.scss';

export default function NoMatch() {
  return (
    <div>
      <h1 className={style.heading}>Route Not Found</h1>
      This is not the page you are looking for.
    </div>
  );
}
