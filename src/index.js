import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import AppHeader from "./components/App-header/app-header"
import NewPanel from "./components/NewTaskForm/new-task-form"
import TodoList from "./components/Task-List/task-list"
import Footer from "./components/Footer/footer"

import "./index.css"

export default function App() {
  const [filter, setFilter] = useState("all")

  const maxId = () => {
    return Math.random(1, 500)
  }

  const filters = (items, filter) => {
    switch (filter) {
      case "all":
        return items
      case "active":
        return items.filter((item) => !item.done)
      case "completed":
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const editLabel = (label, id) => {
    const itemIdx = todoData.findIndex((element) => element.id === id)
    setTodoData([
      ...todoData.slice(0, itemIdx),
      { ...todoData[itemIdx], label: label },
      ...todoData.slice(itemIdx + 1),
    ])
  }

  const createTodoItem = (label, min = 0, sec = 0) => {
    return {
      label,
      done: false,
      id: maxId(),
      created: Date.now(),
      timeLeft: min * 60 + sec,
      isTimerActive: false,
      timerStartedAt: null,
    }
  }

  const [todoData, setTodoData] = useState([
    createTodoItem("Drink Cofee", 1, 30),
    createTodoItem("Make Awesome App", 1, 30),
    createTodoItem("Take a break", 1, 30),
  ])

  const appendTodoItem = (label, min, sec) => {
    setTodoData([...todoData, createTodoItem(label, min, sec)])
  }

  const deleteItem = (id) => {
    const itemIdx = todoData.findIndex((element) => element.id === id)
    setTodoData([...todoData.slice(0, itemIdx), ...todoData.slice(itemIdx + 1)])
  }

  const onToggleDone = (id) => {
    const itemIdx = todoData.findIndex((element) => element.id === id)
    const oldItem = todoData[itemIdx]
    const newItem = { ...oldItem, done: !oldItem.done }

    const newArr = [
      ...todoData.slice(0, itemIdx),
      newItem,
      ...todoData.slice(itemIdx + 1),
    ]
    setTodoData(newArr)
    return newArr
  }

  const switchFilter = (filter) => {
    setFilter(filter)
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.done))
  }

  const onTimerStatusChange = (id) => {
    const index = todoData.findIndex((element) => element.id === id)
    const oldItem = todoData[index]
    const newItem = {
      ...oldItem,
      isTimerActive: !oldItem.isTimerActive,
      timeLeft: oldItem.isTimerActive
        ? Math.round(
            oldItem.timeLeft - (Date.now() - oldItem.timerStartedAt) / 1000
          )
        : oldItem.timeLeft,
      timerStartedAt: !oldItem.isTimerActive ? Date.now() : null,
    }
    const newArr = [
      ...todoData.slice(0, index),
      newItem,
      ...todoData.slice(index + 1),
    ]
    setTodoData(newArr)
    return newArr
  }

  const todoLeft = todoData.filter((el) => !el.done).length
  const itemsRender = filters(todoData, filter)

  return (
    <div className='todo-app'>
      <AppHeader />
      <div className='top-panel d-flex'>
        <NewPanel appendTodoItem={appendTodoItem.bind(this)} />
      </div>
      <TodoList
        todos={itemsRender}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        editLabel={editLabel}
        onTimerStatusChange={onTimerStatusChange}
      />
      <Footer
        left={todoLeft}
        filter={filter}
        switchFilter={switchFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
