import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

import { showAll } from './interfaces';
import { Main } from './Main';

ReactDOM.render(
  <Main nowShowing={showAll}/>,
  document.getElementById('root') as HTMLElement
);
