import { Link } from '@reach/router';
import React from 'react';
import { Action, clearCompletedAction } from './actions';
import { NowShowing } from './interfaces';

interface FooterProps {
  nowShowing: NowShowing,
  dispatch: (a: Action) => void,
  todoCount: number
}

export class Footer extends React.Component<FooterProps, {}> {

  handleClearCompleted = () => 
    this.props.dispatch(clearCompletedAction(this.props.nowShowing));

  render() {
    // tslint:disable no-console
    console.log("rendering footer")
    const { todoCount, nowShowing } = this.props;
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
        onClick={this.handleClearCompleted}>
        Clear completed
      </button>          
    </footer>    
    );
  }
}