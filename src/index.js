import React, { Component } from "react";
import AppHeader from "./components/App-header/app-header";
import NewPanel from "./components/NewTaskForm/new-task-form";
import TodoList from "./components/Task-List/task-list";
import Footer from "./components/Footer/footer";
import ReactDOM from "react-dom";

import "./index.css";

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoItem("Drink Cofee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Take a break"),
    ],
    filter: "all",
  };

  maxId() {
    return Math.random(1, 500);
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "completed":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  editLabel = (label, id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id);

      return {
        todoData: [
          ...todoData.slice(0, itemIdx),
          { ...todoData[itemIdx], label: label },
          ...todoData.slice(itemIdx + 1),
        ],
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId(),
    };
  }

  appendTodoItem(label) {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, this.createTodoItem(label)],
    }));
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id);

      return {
        todoData: [
          ...todoData.slice(0, itemIdx),
          ...todoData.slice(itemIdx + 1),
        ],
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const itemIdx = todoData.findIndex((element) => element.id === id);

      const oldItem = todoData[itemIdx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = [
        ...todoData.slice(0, itemIdx),
        newItem,
        ...todoData.slice(itemIdx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  switchFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  clearCompleted = () => {
    this.setState({
      todoData: this.state.todoData.filter((item) => !item.done),
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const todoLeft = todoData.filter((el) => !el.done).length;
    const itemsRender = this.filter(todoData, filter);
    return (
      <div className="todo-app">
        <AppHeader />
        <div className="top-panel d-flex">
          <NewPanel appendTodoItem={this.appendTodoItem.bind(this)} />
        </div>
        <TodoList
          todos={itemsRender}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          editLabel={this.editLabel}
        />
        <Footer
          left={todoLeft}
          filter={filter}
          switchFilter={this.switchFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
