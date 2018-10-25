import React from 'react';
import { Action, createTodoAction } from './actions'
import { makeTodo } from './data';


interface HeaderState {
  value: string
};

interface HeaderProps {
  dispatch: (a: Action) => void
};

export class Header extends React.Component<HeaderProps, HeaderState> {
  readonly state = { value: ''};

  onSubmit = () => 
    this.props.dispatch(createTodoAction(makeTodo(this.state.value)))

  handleInput = (event: React.ChangeEvent<HTMLInputElement>)  => {    
    this.setState({ value: event.target.value })
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.onSubmit();
      this.setState({ value: ''});
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