import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';
import { Data } from './data';

import { Main } from './Main';

const data = new Data([
  Data.makeTodo('Go Shopping'),
  Data.makeTodo('Pay Visa')
]);

ReactDOM.render(
  <Main data={data}/>,
  document.getElementById('root') as HTMLElement
);
