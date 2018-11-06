import classNames from 'classnames';
import React from 'react';
import { flipStatus, Todo } from './interfaces';
 
export interface State {
    edit: boolean,
    value: string
};

export interface ListItemProps {
    item: Todo,
    handleDestroy: (t: Todo) => void,
    handleEdit: (t: Todo) => void
};

export class ListItem extends React.PureComponent<ListItemProps, State> {
    readonly state = { edit: false, value: this.props.item.title };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>)  =>    
        this.setState({ value: event.target.value } )

    handleDestroy = ()  => 
        this.props.handleDestroy(this.props.item)

    handleToggle = () => {      
      this.props.handleEdit({ ...this.props.item, status: flipStatus(this.props.item.status) })
    }

    handleSubmit = () =>
      this.props.handleEdit({...this.props.item, title: this.state.value})

    handleDoubleClick = ()  => 
        this.setState({ edit: true } )

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 13) {
          this.handleSubmit();
        } else if (event.which === 27) {
          this.setState({edit: false, value: this.props.item.title}) 
        }
    };

    render() {
    // tslint:disable no-console
      const { item } = this.props;
      console.log(`rendering item ${this.props.item.id}`);      
      const classes = classNames({
        completed: item.status.kind === 'Completed',
        editing: this.state.edit
      });
      return (
        <li className={classes}>
          <div className='view'>
            <input
              className="toggle"
              type="checkbox"
              checked={item.status.kind === 'Completed'}
              onChange={this.handleToggle}
            />
            <label onDoubleClick={this.handleDoubleClick}>
              {item.title}
            </label>
            <button
              className="destroy"
              onClick={this.handleDestroy}
            />
          </div>
          <input
            className="edit"
            value={this.state.value}
            name="title"
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
          />
        </li>
      );
    }
  }
  