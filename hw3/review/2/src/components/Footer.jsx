import React from "react";
import classNames from "classnames";

export const Footer = ({
  mode,
  finishedTodosNum,
  unfinishedTodosNum,
  handleClick,
  handleClear,
}) => {
  const currentMode = classNames({
    "todo-app__view-buttons-focus": true,
  });
  return (
    <footer className="todo-app__footer">
      <div className="todo-app__total">{unfinishedTodosNum} left</div>
      <ul className="todo-app__view-buttons">
        <button
          name="All"
          onClick={handleClick}
          className={mode === "All" ? currentMode : ""}
        >
          All
        </button>
        <button
          name="Active"
          onClick={handleClick}
          className={mode === "Active" ? currentMode : ""}
        >
          Active
        </button>
        <button
          name="Completed"
          onClick={handleClick}
          className={mode === "Completed" ? currentMode : ""}
        >
          Completed
        </button>
      </ul>
      <div className="todo-app__clean">
        <button
          name="clearAll"
          className="clean-done"
          onClick={handleClear}
          style={
            finishedTodosNum === 0
              ? { visibility: "hidden" }
              : { visibility: "unset" }
          }
        >
          Clear completed
        </button>
      </div>
    </footer>
  );
};
