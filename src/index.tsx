import { Router } from '@reach/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { showAll, todoActive, todoCompleted } from './interfaces';

import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

import { Main } from './Main';

const MyRouter = () => (
  <Router>
    <Main path='/active' nowShowing={todoActive}/>
    <Main path='/completed' nowShowing={todoCompleted}/>
    <Main path='/' nowShowing={showAll}/>
  </Router>
)

ReactDOM.render(
  <MyRouter/>,
  document.getElementById('root') as HTMLElement
);
