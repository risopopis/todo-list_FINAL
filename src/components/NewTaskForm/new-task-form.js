import React, { Component } from "react";
import PropTypes from "prop-types";
import "./new-task-form.css";

export default class NewPanel extends Component {
  constructor() {
    super();
    this.state = {
      label: "",
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.appendTodoItem(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className="add-item d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control new-input"
          placeholder="What need to be done?"
          onChange={this.onLabelChange}
          autoFocus
          value={this.state.label}
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
