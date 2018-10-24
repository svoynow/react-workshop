import React from "react";
import { Data } from './data';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoItem } from './TodoItem';

// tslint:disable-next-line
const debug = (msg: string) => (e:any) => console.log(msg, e);


export class Main extends React.Component<{ data: Data }, {}> {

  render() {
    const todos = this.props.data.todos;
    return (
      <div className="todomvc-wrapper">
        <section className="todoapp">
          <Header onSubmit={debug('submitted')} />
          
          <section className="main">
            <input
              className="toggle-all"
              id="toggle-all"
              type="checkbox"
              checked={false}
              onChange={debug("toggle all")}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">

              {todos.map(t => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  commitChange={debug('commit change')}
                  destroy={debug('destroy')}                  
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



