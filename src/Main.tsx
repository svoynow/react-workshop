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

export class Main extends React.Component<{nowShowing: NowShowing}, { data: Data }> {

  state = { data };

  editTodo = (todo: Todo) => {
    this.setState({ data: updateTodo(this.state.data, todo) });
  }

  deleteTodo = (todo: Todo) => {
    this.setState({ data: removeTodo(this.state.data, todo) });
  }

  createTodo = (title: string) => {
    this.setState({ data: addTodo(this.state.data, makeTodo(title))});     
  }

  toggleAll = () => { 
    this.setState({ data: toggleAll(this.state.data)})
  }
  
  onClearCompleted = () => {
    this.setState({ data: clearCompleted(this.state.data) })
  }

  render() {
    const todos = this.state.data.todos;
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
          clearCompleted={this.onClearCompleted}
        />
      </div>
    );
  }
}



