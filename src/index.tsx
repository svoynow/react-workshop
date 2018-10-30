import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

import { Main } from './Main';

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement
);
