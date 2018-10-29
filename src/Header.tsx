import React from 'react';
import { connect } from 'react-redux';
import { 
  Action, 
  clearNewTodoAction,
  createTodoAction, 
  enterNewTodoAction 
} from './actions'
import { Data } from './data';
import { makeTodo } from './todo'

interface HeaderProps {
  value: string
  dispatch: (a: Action) => void
};

export class Header extends React.PureComponent<HeaderProps, {}> {
  
  onSubmit = () => {
    const { dispatch, value } = this.props
    dispatch(createTodoAction(makeTodo(value)))
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>)  => {
    const value  = event.target.value
    this.props.dispatch(enterNewTodoAction(value))        
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.onSubmit();
      this.props.dispatch(clearNewTodoAction) 
    }
  }

  render() {
    return (
      <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={this.props.value}
        onChange={this.handleInput}
        onKeyDown={this.handleKeyDown}
      />
    </header>      
    )
  }
}

const mapStateToProps = (state: Data, ownProps: {}) => (
  { ...ownProps, value: state.newTodo }
);

export const HeaderContainer = connect(mapStateToProps)(Header)