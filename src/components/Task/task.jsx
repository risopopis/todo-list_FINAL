import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns'
import "./task.css";

export default class TodoListItem extends Component {
  state = {
    timeToNow: formatDistanceToNow(this.props.created),
    isEditing: false,
    editedValue: ''
  }

  
  switchEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  setEditedValue = (e) => {
    if (e.key === 'Enter' && e.target.value !== ''){
      const { editedValue } = this.state
      this.props.editLabel(editedValue, this.props.id)
      this.setState({
        isEditing: false
      })
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({ timeToNow: formatDistanceToNow(this.props.created) })
  }


  render() {
     let classNames = require('classnames')
    const {
      label, onDeleted, onToggleDone, done
    } = this.props

    let liClasses = classNames({
    'todo-list__li': true,
      ' completed': done,

    })
    
    if (this.state.isEditing){
      liClasses = 'todo-list__li_editing'
    }

    return (
      <li className={liClasses}>
        <div className='task'>
          <input
            className='task__toggle'
            type='checkbox'
            onChange={onToggleDone}
            defaultChecked={done}
          />
          <label className="label">
            <span className='description'>{label}</span>
            <span className='created'>
              Created {' '}
              {this.state.timeToNow}
              {' '}
              ago
            </span>
          </label>
          <button className=' btn icon icon-edit' onClick={this.switchEditing}/>
          <button className=' btn icon icon-destroy' onClick={onDeleted} />
        </div>
        <input 
          type='text' 
          className='edit' 
          placeholder='Type new label' 
          onChange={(e)=>{this.setState({editedValue: e.target.value})}}
          onKeyDown={this.setEditedValue}
        />
      </li>
    )
  }
}
TodoListItem.defaultProps = {
  label: 'undefiend',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  editLabel: () => {},
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  editLabel: PropTypes.func,
  id: PropTypes.number,
  created: PropTypes.string
}