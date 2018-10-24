import classNames from 'classnames';
import React from 'react';
import { 
  Todo, 
  todoActive,
  todoComplete } from './interfaces';

interface TodoItemProps {
  todo: Todo,
  commitChange: (t: Todo) => void,
  destroy: (t: Todo) => void
}

interface TodoItemState {
  input: string,
  editing: boolean,
}

export class TodoItem extends React.PureComponent<TodoItemProps, TodoItemState> {

  constructor(props: TodoItemProps) {
    super(props); 
    this.state = {
      editing: false,
      input: this.props.todo.title,      
    };   
  };

  handleSubmit = () => {
    if (!this.state.editing) {
      return;
    };
    const { commitChange, todo } = this.props;
    const { input } = this.state;
    commitChange({ ...todo, title: input});
  };

  beginEdit = () =>
    this.setState(state => ({ ...state, editing: true }));

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    this.setState(state => ({ ...state, input }));
  }

  onDestroy = () => 
    this.props.destroy(this.props.todo);

  onInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const code = e.keyCode;
    switch(code) {
      case 13: this.handleSubmit();
      case 27: this.setState(state => ({ ...state, editing: false }));
      default: return; 
    };
  };

  toggle = () => {
    const { todo } = this.props
    const status = todo.status === todoComplete ? todoActive : todoComplete;
    this.props.commitChange({ ...todo, status });
  };
    
  render() {
    // tslint:disable no-console
    console.log('rendering todo', this.props.todo.id);
    const { todo: { title, status } } = this.props;
    const { editing, input } = this.state;
    const classes = classNames({
      completed: status === todoComplete,
      editing
    });    
    return (
      <li className={classes}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={status === todoComplete}
          onChange={this.toggle}
        />
        <label onDoubleClick={this.beginEdit}>
          {title}
        </label>
        <button
          className="destroy"
          onClick={this.onDestroy}
        />
      </div>
      <input
        className="edit"
        value={input}
        name="title"
        onChange={this.onInputChange}
        onBlur={this.handleSubmit}
        onKeyDown={this.onInputKeydown}
      />
    </li>
    )     
  }
}