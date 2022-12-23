import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/task'

import './task-list.css'

function TodoList({ todos, onDeleted, onToggleDone, editLabel }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task {...itemProps} key={id} id={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} editLabel={editLabel}/>
    )
  })
  return (
  <div>
    <ul className="todo-list">{elements} </ul>
    
    </div>)
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onCreated: ()=>{}
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  editLabel: PropTypes.func,
  onTimerChange: PropTypes.func
}

export default TodoList
