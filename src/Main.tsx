import { RouteComponentProps } from '@reach/router';
import React from "react";
import { addTodo, deleteCompleted, deleteTodo, makeTodo, toggleAll, updateTodo } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { NowShowing, Todo } from './interfaces';
import { ListItem } from './ListItem';

// tslint:disable no-console
const debug = (msg: string) => () => console.log(msg);

interface State {
  data: Todo[]
};

interface Props extends RouteComponentProps {
  nowShowing: NowShowing
}

export class Main extends React.PureComponent<Props, State> {

  state = {
    data: [ makeTodo('laundry') ],
  };

  createTodo = (title: string) => {
    this.setState({ data: addTodo(this.state.data, title) });
  };

  handleToggleAll = () => {
    this.setState({ data: toggleAll(this.state.data) });
  };

  handleUpdateTodo = (todo: Todo) => {
    this.setState({ data: updateTodo(this.state.data, todo) });
  };

  handleDeleteTodo = (todo: Todo) => {
    this.setState({ data: deleteTodo(this.state.data, todo) });
  };

  handleDeleteCompleted = () => {
    this.setState({ data: deleteCompleted(this.state.data) });
  };

  filterTodos = () => {
    const { nowShowing } = this.props;
    const { data } = this.state
    if (nowShowing.kind === 'ShowAll') {
      return data;
    } else {
      return data.filter(t => t.status.kind === nowShowing.kind);
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
          clearCompleted={this.handleDeleteCompleted}
          nowShowing={this.props.nowShowing}
        />
      </div>
    );
  }
}

