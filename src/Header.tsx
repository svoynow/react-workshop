import React from 'react';
import { connect } from 'react-redux';
import { Action, createTodoAction, enterNewTodoAction } from './actions'
import { Data, makeTodo } from './data';

interface HeaderProps {
  value: string
  dispatch: (a: Action) => void
};

export class Header extends React.PureComponent<HeaderProps, {}> {
  readonly state = { value: ''};

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
      this.props.dispatch(enterNewTodoAction('')) 
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
        value={this.state.value}
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