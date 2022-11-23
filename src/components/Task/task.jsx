import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import "./task.css";

export default class TodoListItem extends Component {
  constructor(){
    super()
  state = {
    created: new Date(),
    timeToNow: formatDistanceToNow(new Date()),
    isEditing: false,
    editedValue: "",
    done: false,
  };
}
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ timeToNow: formatDistanceToNow(this.state.created) });
  }

  switchEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  onDeleteClick = () => {
    this.setState({
      done: true,
    });
  };

  setEditedValue = (el) => {
    if (el.key === "Enter" && el.target.value !== "") {
      const { editedValue } = this.state;
      this.props.editLabel(editedValue, this.state.id);

      this.setState({
        isEditing: false,
      });
    }
  };

  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    let classNames = "";

    if (done) {
      classNames += " done";
    }

    if (this.state.isEditing) {
      classNames = "editing";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            defaultChecked={done}
          />
          <label>
            <span className="description">{label}</span>
            <span className="created">Created {this.state.timeToNow} ago</span>
          </label>
          <button className="btn icon icon-edit" onClick={this.switchEditing} />
          <button className=" btn icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          placeholder="Type new label"
          onChange={(e) => {
            this.setState({ editedValue: el.target.value });
          }}
          onKeyDown={this.setEditedValue}
        />
      </li>
    );
  }
}
TodoListItem.defaultProps = {
  label: "undefiend",
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  editLabel: () => {},
};

TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  editLabel: PropTypes.func,
};
