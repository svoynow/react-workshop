import { RouteComponentProps } from '@reach/router';
import React from "react";
import { 
  addTodo, 
  clearCompleted,
  Data,
  makeTodo,
  removeTodo,
  toggleAll,
  updateTodo,
 } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { NowShowing, Todo } from './interfaces';
import { TodoItem } from './TodoItem';


const data = {
  todos: [
    makeTodo('Go Shopping'),
    makeTodo('Pay Visa')
  ] 
};

interface Props extends RouteComponentProps {
  nowShowing: NowShowing
};

interface State {
  data: Data
}

export class Main extends React.Component<Props, State> {

  state = { data };

  render() {
    const todos = this.filteredTodos();
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
              onChange={this.toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">

              {todos.map(t => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  commitChange={this.editTodo}
                  destroy={this.deleteTodo}                  
                />
              ))} 

            </ul>
          </section>
        </section>

        <Footer 
          todoCount={1} 
          nowShowing={this.props.nowShowing}
          clearCompleted={this.onClearCompleted}
        />
      </div>
    );
  }

  private editTodo = (todo: Todo) => {
    this.setState({ data: updateTodo(this.state.data, todo) });
  }

  private deleteTodo = (todo: Todo) => {
    this.setState({ data: removeTodo(this.state.data, todo) });
  }

  private createTodo = (title: string) => {
    this.setState({ data: addTodo(this.state.data, makeTodo(title))});     
  }

  private toggleAll = () => { 
    this.setState({ data: toggleAll(this.state.data)})
  }
  
  private onClearCompleted = () => {
    this.setState({ data: clearCompleted(this.state.data) })
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
