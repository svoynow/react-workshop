import React from "react";
import { Footer } from './Footer';
import { Header } from './Header';

// tslint:disable-next-line
const debug = (msg: string) => (e:any) => console.log(msg, e);

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

              { /* single TODO */}
              <li>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={false}
                    onChange={debug("item 1 change")}
                  />
                  <label onDoubleClick={debug("item 1 doubleclick")}>
                    Pay Visa
                  </label>
                  <button
                    className="destroy"
                    onClick={debug("item 1 destroy")}
                  />
                </div>
                <input
                  className="edit"
                  value="Pay Visa"
                  name="title"
                  onChange={debug("item 1 change")}
                  onBlur={debug("item 1 edit commit")}
                  onKeyDown={debug("item 1 keyDown")}
                />
              </li>
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



