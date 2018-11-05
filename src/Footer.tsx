import { Link } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import { NowShowing } from './interfaces';
import { clearCompleted, Dispatch } from './newActions';

interface FooterProps {
  nowShowing: NowShowing,
  todoCount: number,
  clearCompleted: () => void
}

export const Footer = (props: FooterProps) => {
  // tslint:disable no-console
  console.log("rendering footer")
  const { todoCount, nowShowing, clearCompleted: doClearCompleted } = props;
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
      onClick={doClearCompleted}>
      Clear completed
    </button>          
  </footer>    
  );
};


interface FooterContainerProps {
  nowShowing: NowShowing,
  todoCount: number
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: FooterContainerProps) => (
  {
    clearCompleted: () => dispatch(clearCompleted(ownProps.nowShowing))
  }
);

export const FooterContainer = connect(null, mapDispatchToProps)(Footer)