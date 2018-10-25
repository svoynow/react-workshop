import { RouteComponentProps } from '@reach/router';
import React from "react";
import { Action,
  loadTodosAction,
  processAction, 
  toggleAllAction
} from './actions';
import { 
  Data,
  load,
 } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { NowShowing } from './interfaces';
import { TodoItem } from './TodoItem';


interface Props extends RouteComponentProps {
  nowShowing: NowShowing
};

interface State {
  data: Data
}

export class Main extends React.Component<Props, State> {

  state: State = { data: { todos: [] } };

  dispatch = (action: Action) => {    
    this.setState({ data: processAction(this.state.data, action)})
  }

  componentDidMount() {
    this.dispatch(loadTodosAction(load()))
  }

  render() {
    const todos = this.filteredTodos();
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">
          <Header dispatch={this.dispatch} />
          
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
                <TodoItem
                  key={t.id}
                  todo={t}
                  dispatch={this.dispatch}                
                />
              ))} 

            </ul>
          </section>
        </section>

        <Footer 
          todoCount={1} 
          nowShowing={this.props.nowShowing}
          dispatch={this.dispatch}
        />
      </div>
    );
  }

  private toggleAll = () => { 
    this.dispatch(toggleAllAction);
  }
  
  private filteredTodos = () => {
    switch(this.props.nowShowing.type) {
      case('ShowAll'): return this.state.data.todos
      case('TodoActive'):
      case('TodoComplete'): 
        return this.state.data.todos.filter(t => t.status === this.props.nowShowing)    
    }
  } 
};
