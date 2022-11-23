import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../Task/task'

import './task-list.css'

function TodoList({ todos, onDeleted, onToggleDone, editLabel }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <TodoListItem {...itemProps} key={id} id={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} editLabel={editLabel}/>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  editLabel: () => {}
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  editLabel: PropTypes.func
}

export default TodoList