import React from 'react';

import style from './page1.container.scss';

export default function Page1() {
  // loading and error required
  return (
    <div>
      <h1 className={style.heading}>
        Page1
      </h1>
      Data to Render (should support loading and error)
      <div>
        Data already loaded: flag
      </div>
    </div>
  );
}
