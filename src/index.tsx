import { Router } from "@reach/router"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

import { showAll, todoActive, todoComplete } from './interfaces';
import { MainContainer } from './Main';
import { store } from './store';

const MyRouter = () => (
  <Router>
    <MainContainer path='/active' nowShowing={todoActive}/>
    <MainContainer path='/complete' nowShowing={todoComplete}/>
    <MainContainer path='/' nowShowing={showAll}/>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <MyRouter/>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
