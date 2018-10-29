import React from "react";
import { Footer } from './Footer';
import { Header } from './Header';
import { ListItem } from './ListItem';

// tslint:disable-next-line
const debug = (msg: string) => (e:any) => console.log(msg, e);

const todos = [
  {
    completed: false,
    id: 'abdcd',    
    title: 'Go Shopping'
  },
  { 
    completed: true,
    id: 'xwdfs',
    title: 'Pay Visa'
  }
];

export class Main extends React.Component<{}, {}> {
  render() {
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

            {/* TODO list */}
            <ul className="todo-list">

            {todos.map(t => (
              <ListItem 
                key={t.id}
                item={t}
                handleToggle={debug(`Toggled: ${JSON.stringify(t)}`)}
                handleDestroy={debug(`Destroyed: ${JSON.stringify(t)}`)}
                handleEdit={debug(`Edited: ${JSON.stringify(t)}`)}
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

