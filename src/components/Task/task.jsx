import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns'
import "./task.css";



export default function TodoListItem ({
  created, timeLeft, timerStartedAt, editLabel, id, onTimerStatusChange, isTimerActive,
  done, onToggleDone, label, onDeleted, timerID
}) {

  const [timeToNow, setTimetoNow ] = useState(formatDistanceToNow(created))
  const [isEditing, setEditing] = useState(false)
  const [editedValue, setEditValue] = useState("")


 const switchEditing = () => {
    setEditing(!isEditing)
  }

  const getTimerValue = (s, startedAt) => {
   if (startedAt) s -= Math.round((Date.now() - startedAt)/1000)
    return (s-(s%=60))/60+(9<s? ' min ' :':0')+s+" sec "
  }


    const [timerValue, setTimerValue] = useState(getTimerValue(timeLeft, timerStartedAt))

  const setEditedValue = (e) => {
    if (e.key === 'Enter' && e.target.value !== ''){
      // const { editedValue } = this.state
     editLabel(editedValue, id)
      setEditing(false)
    }
  }

 useEffect(()=>{
  if (isTimerActive){
        timerID = setInterval(() => tick(), 1000)
      }
 }, [isTimerActive])

 useEffect(()=>{
  clearInterval(timerID)
 }, [])



  const tick = () => {
    setTimetoNow(formatDistanceToNow(created))
    setTimerValue(getTimerValue(timeLeft, timerStartedAt))
  }

  
  const timerSwitch = (id) => {
    onTimerStatusChange(id)
    if (timerID){
      clearInterval(timerID)
      timerID = null
      return 
    }
    timerID = setInterval(()=>{
      tick()
    }, 1000)
  }


   let classNames = require('classnames')
    let liClasses = classNames({
      'todo-list__li': true,
       ' completed': done,
    })
  //  
    
    if (isEditing){
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
              timerSwitch(id)
             }
           /> 
        <button className="icon-pause" 
        onClick={()=>{
        timerSwitch(id) 
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
              {timeToNow}
              {' '}
              ago
            </span>
          
          </label>
          <button className=' btn icon icon-edit' onClick={switchEditing}/>
          <button className=' btn icon icon-destroy' onClick={onDeleted} />
        </div>
        <input 
          type='text' 
          className='edit' 
          placeholder='Type new label' 
          onChange={(e)=>{setEditValue(e.target.value)}}
          onKeyDown={setEditedValue}
        />
      </li>
    )
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
  timerStartedAt: PropTypes.number,
  timerID: PropTypes.number
}
