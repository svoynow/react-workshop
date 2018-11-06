import { RouteComponentProps } from '@reach/router';
import React from "react";
import { connect } from 'react-redux';
import { makeTodo } from './data';
import { FooterContainer } from './Footer';
import { Header } from './Header';
import { NowShowing, State, Status, Todo, toggledStatus  } from './interfaces';
import { ListItem } from './ListItem';
import { createTodo, 
  deleteTodo, 
  fetchTodos, 
  toggleAll,
  updateTodo } from './newActions';

// tslint:disable no-console
const debug = (msg: string) => () => console.log(msg);

interface Props extends RouteComponentProps {
  nowShowing: NowShowing
  data: Todo[],
  addTodo: (t: Todo) => void,
  deleteTodo: (t: Todo) => void,
  fetchTodos: () => void,
  toggleAll: (t: Todo[], s: Status) => void,
  updateTodo: (t: Todo) => void 
}

export class Main extends React.PureComponent<Props, {}> {

  componentDidMount() {
    this.props.fetchTodos();
  }

  createTodo = (title: string) => {
    this.props.addTodo(makeTodo(title));
  };

  handleToggleAll = () => {
    const toToggle = this.filterTodos()
    this.props.toggleAll(toToggle, toggledStatus(toToggle));
  };

  handleUpdateTodo = (todo: Todo) => {
    this.props.updateTodo(todo);
  };

  handleDeleteTodo = (todo: Todo) => {
    this.props.deleteTodo(todo);
  };

  filterTodos = (): Todo[] => {
    const { nowShowing, data } = this.props;
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

        <FooterContainer
          todoCount={this.props.data.length}           
          nowShowing={this.props.nowShowing}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { data: state.data }
};

const mapDispatchToProps = {
  addTodo: createTodo,
  deleteTodo,
  fetchTodos,
  toggleAll,
  updateTodo
};

export const MainContainer = 
  connect(mapStateToProps, mapDispatchToProps)(Main)

