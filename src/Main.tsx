import { RouteComponentProps } from '@reach/router';
import React from "react";
import {
  Action,
  addTodoAction,
  deleteTodoAction,
  fetchTodosAction,
  processAction,
  toggleAllAction,
  updateTodoAction
} from './actions'
import { makeTodo } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { NowShowing, State, Todo } from './interfaces';
import { ListItem } from './ListItem';

// tslint:disable no-console
const debug = (msg: string) => () => console.log(msg);

interface Props extends RouteComponentProps {
  nowShowing: NowShowing
}

export class Main extends React.PureComponent<Props, State> {

  state = {
    data: []
  };

  dispatch = (action: Action) => {
    console.log('got action', action);
    this.setState(processAction(action, this.state));
  }; 

  componentDidMount() {
    this.dispatch(fetchTodosAction());  
  }

  createTodo = (title: string) => {
    this.dispatch(addTodoAction(makeTodo(title)));
  };

  handleToggleAll = () => {
    this.dispatch(toggleAllAction(this.props.nowShowing));
  };

  handleUpdateTodo = (todo: Todo) => {
    this.dispatch(updateTodoAction(todo));
  };

  handleDeleteTodo = (todo: Todo) => {
    this.dispatch(deleteTodoAction(todo));
  };

  filterTodos = (): Todo[] => {
    const { nowShowing } = this.props;
    const { data } = this.state
    if (nowShowing.kind === 'ShowAll') {
      return data;
    } else {
      return data.filter((t: Todo) => t.status.kind === nowShowing.kind);
    }
  }

  render() {
    debug('rendering main component')();
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">
          <Header onSubmit={this.createTodo} />
          
          <section className="main">
            <input
              className="toggle-all"
              id="toggle-all"
              type="checkbox"
              checked={false}
              onChange={this.handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {/* TODO list */}
            <ul className="todo-list">

            {this.filterTodos().map(t => (
              <ListItem 
                key={t.id}
                item={t}
                handleEdit={this.handleUpdateTodo}
                handleDestroy={this.handleDeleteTodo}
              />
            ))}

            </ul>
          </section>
        </section>

        <Footer 
          todoCount={this.state.data.length} 
          dispatch={this.dispatch}
          nowShowing={this.props.nowShowing}
        />
      </div>
    );
  }
}

