if (process.env.NODE_ENV === 'development' && ENV_MOCK) {
  require('../mock/example.js');
}

import React from 'react';
import {render} from 'react-dom';
import styles from './index.less';

class App extends React.Component {
  render() {
    return (
      <div id={styles.layout}>
        <h1>Oops! Nice meeting you!</h1>
        <div className={styles.logo} />
        <p>Please coding in <span>./src/index.js</span>.</p>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
