import { RouteComponentProps } from '@reach/router';
import React from "react";
import { connect } from 'react-redux';
import { filterTodos, makeTodo } from './data';
import { FooterContainer } from './Footer';
import { Header } from './Header';
import { NewTodo, NowShowing, State, Todo } from './interfaces';
import { ListItem } from './ListItem';
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  toggleAll,
  updateTodo
} from './newActions'

// tslint:disable no-console
const debug = (msg: string) => () => console.log(msg);

interface Props extends RouteComponentProps {
  nowShowing: NowShowing
  data: Todo[],
  addTodo: (t: NewTodo) => void,
  deleteTodo: (t: Todo) => void,
  fetchTodos: () => void,
  toggleAll: (ts: Todo[]) => void,
  updateTodo: (t: Todo) => void 
}

export class Main extends React.PureComponent<Props, {}> {

  componentDidMount() {
    this.props.fetchTodos();
  }
  
  nextTodo = () => {
    const orders = this.props.data.map(t => t.order);
    return orders ? Math.max(...orders) + 1 : 0;
  };
    
  createTodo = (title: string) => {
    this.props.addTodo(makeTodo(title, this.nextTodo()));
  };

  handleToggleAll = () => {
    const { data, nowShowing, toggleAll: toggle } = this.props;
    toggle(filterTodos(data, nowShowing))
  };

  handleUpdateTodo = (todo: Todo) => {
    this.props.updateTodo(todo);
  };

  handleDeleteTodo = (todo: Todo) => {
    this.props.deleteTodo(todo);
  };

  render() {
    debug('rendering main component')();
    const { data, nowShowing } = this.props
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

            {filterTodos(data, nowShowing).map(t => (
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
          todoCount={data.length}           
          nowShowing={nowShowing}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { data: state.data}
};

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  fetchTodos,
  toggleAll,
  updateTodo
};

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)

