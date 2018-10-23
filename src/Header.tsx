import React from 'react';


interface HeaderState {
  value: string
};

interface HeaderProps {
  onSubmit: (todoTitle: string) => void
};

export class Header extends React.Component<HeaderProps, HeaderState> {
  readonly state = { value: ''};

  handleInput = (event: React.ChangeEvent<HTMLInputElement>)  => {    
    this.setState({ value: event.target.value })
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.props.onSubmit(this.state.value)
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