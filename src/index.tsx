import { Router } from '@reach/router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { showAll, State, todoActive, todoCompleted } from './interfaces';
import { processAction } from './reducers'

import '../node_modules/todomvc-app-css/index.css';
import '../node_modules/todomvc-common/base.css';

import { MainContainer } from './Main';

const middleware = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  processAction,
  { data: [] } as State,
  middleware
)

const MyRouter = () => (
  <Router>
    <MainContainer path='/active' nowShowing={todoActive}/>
    <MainContainer path='/completed' nowShowing={todoCompleted}/>
    <MainContainer path='/' nowShowing={showAll}/>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <MyRouter/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
