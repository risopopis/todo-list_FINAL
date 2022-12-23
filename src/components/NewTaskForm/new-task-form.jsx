import React, { Component } from "react";
import PropTypes from "prop-types";
import "./new-task-form.css";

export default class NewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      min: "",
      sec: "",
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const {label, min, sec} = this.state
    const {appendTodoItem} = this.props
    if(e.key === "Enter" && e.target.value !== ""){
      appendTodoItem(label, min, sec)
    this.setState({
      label: "",
      min: "",
      sec: "",
    });
  }
  };

  render() {
    return (
      <form className="add-item d-flex">
        <input
          type="text"
          className="form-control new-input"
          placeholder="What need to be done?"
          onChange={this.onLabelChange}
          onKeyDown={this.onSubmit}
          autoFocus
          value={this.state.label}
        />
         <input
          type="number"
          min = "0"
          className="form-control new-input-form__timer"
          placeholder="min"
          onChange={this.onMinChange}
          onKeyDown={this.onSubmit}
          autoFocus
          value={this.state.min}
        />
         <input
          type="number"
          min = "0"
          className="form-control new-input__timer"
          placeholder="sec"
          onChange={this.onSecChange}
          onKeyDown={this.onSubmit}
          autoFocus
          value={this.state.sec}
        />
      </form>
    );
  }
}

NewPanel.defaultProps = {
  appendTodoItem: () => {},
};
NewPanel.propTypes = {
  appendTodoItem: PropTypes.func,
};
