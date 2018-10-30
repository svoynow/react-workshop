import { Link } from '@reach/router';
import React from 'react';
import { NowShowing } from './interfaces';

interface FooterProps {
  clearCompleted: React.EventHandler<React.FormEvent<HTMLButtonElement>>,
  nowShowing: NowShowing,
  todoCount: number
}

export class Footer extends React.Component<FooterProps, {}> {

  render() {
    // tslint:disable no-console
    console.log("rendering footer")
    const { todoCount, clearCompleted, nowShowing } = this.props;
    return (
      <footer className='footer'>
      <span className='todo-count'>{todoCount} Todo left</span>
      <ul className='filters'>
        <li>
          <Link to='/' className={ nowShowing.kind === 'ShowAll' ? 'selected' : '' }>All</Link>          
        </li>
        <li>
          <Link to='/active' className={ nowShowing.kind === 'Active' ? 'selected' : '' }>Active</Link>          
        </li>
        <li>
          <Link to='/completed' className={ nowShowing.kind === 'Completed' ? 'selected' : '' }>Completed</Link>          
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={clearCompleted}>
        Clear completed
      </button>          
    </footer>    
    );
  }
}