import { RouteComponentProps } from '@reach/router';
import { List } from 'immutable';
import React from "react";
import { connect } from 'react-redux';
import { Action,
  loadTodosAction,
  toggleAllAction
} from './actions';
import { 
  Data,
  load,
 } from './data';
import { Footer } from './Footer';
import { HeaderContainer } from './Header';
import { NowShowing } from './interfaces';
import { Todo } from './todo'
import { TodoItemContainer } from './TodoItem';

interface Props extends RouteComponentProps {
  todos: List<Todo>,
  nowShowing: NowShowing,
  dispatch: (a: Action) => void
};

export class Main extends React.PureComponent<Props, {}> {

  componentDidMount() {
    this.props.dispatch(loadTodosAction(load()))
  }

  render() {
    const todos = this.filteredTodos();
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">
          <HeaderContainer />
          
          <section className="main">
            <input
              className="toggle-all"
              id="toggle-all"
              type="checkbox"
              checked={false}
              onChange={this.toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">

              {todos.map(t => (
                <TodoItemContainer
                  key={t.id}
                  todoId={t.id}                  
                />
              ))} 

            </ul>
          </section>
        </section>

        <Footer 
          todoCount={1} 
          nowShowing={this.props.nowShowing}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }

  private toggleAll = () => { 
    this.props.dispatch(toggleAllAction);
  }
  
  private filteredTodos = () => {
    const { nowShowing, todos} = this.props
    switch(this.props.nowShowing.type) {
      case('ShowAll'): return todos
      case('TodoActive'):
      case('TodoComplete'): 
        return todos.filter(t => t.status.type === nowShowing.type)    
    }
  } 
};

// connected component

interface ContainerProps extends RouteComponentProps {
  nowShowing: NowShowing
};

const mapStateToProps = (state: Data, ownProps: ContainerProps) => (
  { ...ownProps, todos: state.todos }
)

export const MainContainer = connect(mapStateToProps)(Main);
