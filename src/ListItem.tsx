import classNames from 'classnames';
import React from 'react';

interface Todo {
    id: string,
    completed: boolean,
    title: string
};
 
interface State {
    edit: boolean,
    value: string
};

interface ListItemProps {
    item: Todo,
    handleToggle: (t: Todo) => void,
    handleDestroy: (t: Todo) => void,
    handleEdit: (t: Todo) => void
};

export class ListItem extends React.Component<ListItemProps, State> {
    readonly state = { edit: false, value: this.props.item.title };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>)  => {    
        this.setState({ value: event.target.value } )
    };

    handleDestroy = ()  => {    
        this.props.handleDestroy(this.props.item)
    };

    toggle = () => {
      this.props.handleToggle(this.props.item)
    };

    submit = () => {
      this.props.handleEdit({...this.props.item, title: this.state.value})
    };

    handleDoubleClick = ()  => {    
        this.setState({ edit: true } )
    };

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 13) {
          this.submit();
        } else if (event.which === 27) {
          this.setState({edit: false, value: this.props.item.title}) 
        }
    };

    render() {
      const {} = this.props;
      const classes = classNames({
        completed: this.props.item.completed,
        editing: this.state.edit
      });
      return (
        <li className={classes}>
          <div className='view'>
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.item.completed}
              onChange={this.toggle}
            />
            <label onDoubleClick={this.handleDoubleClick}>
              {this.props.item.title}
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
            onBlur={this.submit}
            onKeyDown={this.handleKeyDown}
          />
        </li>
      );
    }
  }
  