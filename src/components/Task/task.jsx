import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns'
import "./task.css";



export default class TodoListItem extends Component {
  state = {
    timeToNow: formatDistanceToNow(this.props.created),
    isEditing: false,
    editedValue: '',
    timerValue: this.getTimerValue(this.props.timeLeft, this.props.timerStartedAt)
  }

  switchEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  getTimerValue(s, startedAt){
   if (startedAt) s -= Math.round((Date.now() - startedAt)/1000)
    return (s-(s%=60))/60+(9<s? ' min ' :':0')+s+" sec "
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
    if (this.props.isTimerActive){
      this.timerID = setInterval(() => this.tick(), 1000)
    }
  }

  componentWillUnmount() {

    clearInterval(this.timerID)
  }


  tick() {
    this.setState((oldState)=>
    ({ ...oldState, timeToNow: formatDistanceToNow(this.props.created),
      timerValue: this.getTimerValue(this.props.timeLeft, this.props.timerStartedAt) })
    )
  
  }

  
  timerSwitch(id){
    this.props.onTimerStatusChange(id)
    if (this.timerID){
      clearInterval(this.timerID)
      this.timerID = null
      return 
    }
    this.timerID = setInterval(()=>{
      this.tick()
    }, 1000)
  }


  render() {
     let classNames = require('classnames')
    const {
      label, onDeleted, onToggleDone, done, id
    } = this.props
    const {timeLeft} = this.props
    const {timerValue} = this.state
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
            <span className='title'>{label}</span>
            <span className='description'>
        {timeLeft ? (
          <div>
            <button
            className="icon-play" 
              onClick={() =>
              this.timerSwitch(id)
             }
           /> 
        <button className="icon-pause" 
        onClick={()=>{
             this.timerSwitch(id) 
            }
            }
               />
            <span>{timerValue}</span>
          </div>
        ) : (
          <span> время вышло!</span>
        )}
            </span>
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
  min: PropTypes.number,
  sec: PropTypes.number,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  editLabel: PropTypes.func,
  id: PropTypes.number,
  created: PropTypes.number,
  timeLeft: PropTypes.number,
  onTimerStatusChange: PropTypes.func,
  isTimerActive: PropTypes.bool,
  timerStartedAt: PropTypes.number
}
