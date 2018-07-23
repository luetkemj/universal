import React from 'react';
import PropTypes from 'prop-types';

import style from './page2.container.scss';

export default function Page2(props) {
  return (
    <div>
      <h1 className={style.heading}>
        Page2
      </h1>
      <input
        className={style.button}
        type="submit"
        onClick={() => props.history.push('/page1')}
        value="Push onto Browser History Object to Page 1"
      />

      <input
        className={style.button}
        type="submit"
        onClick={() => props.history.goBack()}
        value="Use Browser History to go back"
      />
    </div>
  );
}

Page2.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};
