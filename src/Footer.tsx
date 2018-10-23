import React from 'react';

interface FooterProps {
  clearCompleted: React.EventHandler<React.FormEvent<HTMLButtonElement>>,
  todoCount: number
}

export class Footer extends React.Component<FooterProps, {}> {

  render() {
    const { todoCount, clearCompleted } = this.props;
    return (
      <footer className='footer'>
      <span className='todo-count'>{todoCount} Todo left</span>
      <ul className='filters'>
        <li>
          <a href='#' className='selected'>All</a>
        </li>
        <li>
          <a href='#' className='selected'>Active</a>
        </li>
        <li>
          <a href='#' className='selected'>Completed</a>
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