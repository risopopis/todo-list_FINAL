import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns'
import "./task.css";
import Timer from "../timer/timer";


export default class TodoListItem extends Component {
  state = {
    timeToNow: formatDistanceToNow(this.props.created),
    isEditing: false,
    editedValue: '',
    timerActive: true,
    min: this.props.min,
    sec:  this.props.sec
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



  // componentDidUpdate(prevProps, prevState){
  //   const {timerActive} = this.state
  //   if (timerActive && prevState !== this.state) {
  //     this.setState({
  //       timerActive: !timerActive
  //     })
  //   }
  //   }


  tick() {
    this.setState({ timeToNow: formatDistanceToNow(this.props.created) })
  }

  
  timerSwitch(){
    const {timerActive} = this.state
    this.setState({ timerActive: !timerActive });
     setInterval(() => {
      this.timerSec();
    }, 10)
   
  }

  timerSec() {
    let { sec, timerActive } = this.state;
    if (sec > 0 && timerActive) {
      setTimeout(() => {
        this.setState({
          sec: sec - 1
      })}, 1000)
    } 
  }
  


  render() {
     let classNames = require('classnames')
    const {
      label, onDeleted, onToggleDone, done,
    } = this.props
    const {min, sec} = this.state
    const {timerActive} = this.state
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
            <div>
        {sec ? (
          <div>
            <button
            className="icon-play" 
              onClick={() =>
              this.timerSwitch()
             
              }
            > 
        </button>
            <span>{min} min and {sec} sec </span>
          </div>
        ) : min>=1 ? 
        (this.setState({sec: sec + 60,
          min: min-1, 
          })) : (
          <span> время вышло!</span>
        )}
            <button className="icon-pause" onClick={()=>{
              this.setState({
                timerActive: !timerActive
              })
            }
            }
               ></button>
      </div>
           {/* <Timer min = {min} sec = {sec} timerActive = {timerActive} /> */}
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
  created: PropTypes.number
}
