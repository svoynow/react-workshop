import React from "react";
import { Data } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { Todo } from './interfaces';
import { TodoItem } from './TodoItem';

// tslint:disable-next-line
const debug = (msg: string) => (e:any) => console.log(msg, e);

const data = new Data([
  Data.makeTodo('Go Shopping'),
  Data.makeTodo('Pay Visa')
]);

export class Main extends React.Component<{}, { data: Data }> {

  state = { data };

  editTodo = (todo: Todo) => {
    this.state.data.updateTodo(todo);
  }

  deleteTodo = (todo: Todo) => {
    this.state.data.removeTodo(todo);
  }

  createTodo = (title: string) => {
    this.state.data.addTodo(Data.makeTodo(title));     
  }

  toggleAll = () => { 
    this.state.data.toggleAll();
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
          clearCompleted={debug('clear completed')}
        />
      </div>
    );
  }
}



