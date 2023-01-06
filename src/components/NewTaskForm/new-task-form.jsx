import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import "./new-task-form.css";

export default function NewPanel ({appendTodoItem}) {

  const [label, setLabel] = useState("")
  const [min, setMin] = useState("")
  const [sec, setSec] = useState("")

  const onLabelChange = (e) => {
      setLabel(e.target.value)

  };

  const onMinChange = (e) => {
    setMin(e.target.value)
  };

 const onSecChange = (e) => {
    setSec(e.target.value)
  };

  const onSubmit = (e) => {
    if(e.key === "Enter" && e.target.value !== "") {
      appendTodoItem(label, min, sec)
    setLabel("")
    setMin("")
    setSec("")
  }
};
    return (
      <form className="add-item d-flex">
        <input
          type="text"
          className="form-control new-input"
          placeholder="What need to be done?"
          onChange={onLabelChange}
          onKeyDown={onSubmit}
          autoFocus
          value={label}
        />
         <input
          type="number"
          min = "0"
          className="form-control new-input-form__timer"
          placeholder="min"
          onChange={onMinChange}
          onKeyDown={onSubmit}
          autoFocus
          value={min}
        />
         <input
          type="number"
          min = "0"
          className="form-control new-input-form__timer"
          placeholder="sec"
          onChange={onSecChange}
          onKeyDown={onSubmit}
          autoFocus
          value={sec}
        />
      </form>
    );
  }


NewPanel.defaultProps = {
  appendTodoItem: () => {},
};
NewPanel.propTypes = {
  appendTodoItem: PropTypes.func,
};
