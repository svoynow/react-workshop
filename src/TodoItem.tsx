import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { 
  Action, 
  cancelEditingAction, 
  deleteTodoAction, 
  editTodoAction, 
  finishEditingAction, 
  startEditingAction, 
  updateEditingAction } from './actions';
import { Data } from './data';
import { 
  todoActive,
  todoComplete } from './interfaces';
import { Todo } from './todo';

interface TodoItemProps {
  editing: Todo | null,
  todo: Todo,
  dispatch: (a: Action) => void,
}

export class TodoItem extends React.PureComponent<TodoItemProps, {}> {

  handleSubmit = () => {
    if (!this.props.editing) {
      return;
    };
    const { dispatch, todo } = this.props;
    dispatch(finishEditingAction(todo.merge({ title: this.props.editing.title})));
  };

  beginEdit = () => {
    const { dispatch, todo } = this.props;
    dispatch(startEditingAction(todo)); 
  };
    
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatch } = this.props;
    const input = e.currentTarget.value;
    dispatch(updateEditingAction(input));
  }

  onDestroy = () => {
    const { dispatch, todo } = this.props;
    dispatch(deleteTodoAction(todo));
  };

  onInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { dispatch } = this.props;
    const code = e.keyCode;
    switch(code) {
      case 13: this.handleSubmit();
      case 27: dispatch(cancelEditingAction);        
      default: return; 
    };
  };

  toggle = () => {
    const { todo, dispatch } = this.props
    const status = todo.status === todoComplete ? todoActive : todoComplete;
    dispatch(editTodoAction(todo.merge({ status })))    
  };
    
  render() {
    // tslint:disable no-console
    console.log('rendering todo', this.props.todo.id);
    const { todo: { title, status }, editing } = this.props;
    const input = editing ? editing.title : title;
    const classes = classNames({
      completed: status.type === todoComplete.type,
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

interface TodoItemContainerProps {
  todoId: string
};

const mapStateToProps = (state: Data, ownProps: TodoItemContainerProps) => (
  { ...ownProps,
    editing: (state.nowEditing && state.nowEditing.id === ownProps.todoId) ? state.nowEditing : null,
    todo: state.todos.filter(t => t.id === ownProps.todoId).first(), 
  }
);

export const TodoItemContainer = connect(mapStateToProps)(TodoItem)
