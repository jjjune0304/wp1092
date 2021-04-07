import React from "react";
import classNames from "classnames";

export const Item = ({ id, task, isCompleted, onChange, onDeleteTask }) => {
  const checkboxClass = classNames({
    "todo-app__item-detail": true,
    "line-through": isCompleted,
  });

  return (
    <li key={id} className="todo-app__item">
      <div className="todo-app__checkbox">
        <input
          type="checkbox"
          onChange={onChange}
          checked={isCompleted}
          id={id}
        />
        <label htmlFor={id}></label>
      </div>
      <h1 className={checkboxClass}>{task}</h1>
      <img
        src="./img/x.png"
        alt=""
        className="todo-app__item-x"
        onClick={onDeleteTask}
      />
    </li>
  );
};
