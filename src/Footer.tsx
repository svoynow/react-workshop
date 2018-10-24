import { Link } from '@reach/router'
import React from 'react';
import { 
  NowShowing, 
  showAll, 
  todoActive, 
  todoComplete 
} from './interfaces'

interface FooterProps {
  clearCompleted: React.EventHandler<React.FormEvent<HTMLButtonElement>>,
  todoCount: number,
  nowShowing: NowShowing
}

export class Footer extends React.Component<FooterProps, {}> {

  render() {
    const { todoCount, clearCompleted, nowShowing } = this.props;
    return (
      <footer className='footer'>
      <span className='todo-count'>{todoCount} Todo left</span>
      <ul className='filters'>
        <li>
          <Link to='/' className={nowShowing === showAll ? 'selected' : ''}>All</Link>         
        </li>
        <li>
          <Link to='/active' className={nowShowing === todoActive ? 'selected' : ''}>Active</Link>          
        </li>
        <li>
          <Link to='/complete' className={nowShowing === todoComplete ? 'selected' : ''}>Completed</Link>          
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