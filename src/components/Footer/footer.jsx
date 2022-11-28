import React, { Component } from "react";
import PropTypes from "prop-types";

import "./footer.css";

export default class Footer extends Component {
  buttonsData = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  

  render() {
    const { left, filter, switchFilter, clearCompleted } = this.props;
    const buttons = this.buttonsData.map(({ name, label }) => (
      <li className="btn-filter-item" key={name}>
        <input type="radio" id={name}
        name="radio-btn"
        className="radio-btn"/>
        <htmlFor id={name}
        className={filter === name ? "selected" : ""}
        onClick={() => {
        switchFilter(name);
        }}>{label}</htmlFor>
      </li>
    ));

    return (
      <footer className="footer">
        <span className="todo-count">{left} items left</span>
        <ul className="filters">
          {buttons}
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </ul>
      </footer>
    );
  }
}

Footer.defaultProps = {
  left: -1,
  filter: "all",
  switchFilter: () => {},
  clearCompleted: () => {},
};
Footer.propTypes = {
  left: PropTypes.number,
  filter: PropTypes.string,
  switchFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};
