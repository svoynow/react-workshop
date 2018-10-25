import { Link } from '@reach/router'
import React from 'react';
import { Action, clearCompletedAction } from './actions'
import { 
  NowShowing, 
  showAll, 
  todoActive, 
  todoComplete 
} from './interfaces'

interface FooterProps {
  dispatch: (a: Action) => void,
  todoCount: number,
  nowShowing: NowShowing
}

export class Footer extends React.Component<FooterProps, {}> {

  onClearCompleted = () =>
    this.props.dispatch(clearCompletedAction)

  render() {
    const { todoCount, nowShowing } = this.props;
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
        onClick={this.onClearCompleted}>
        Clear completed
      </button>          
    </footer>    
    );
  }
}