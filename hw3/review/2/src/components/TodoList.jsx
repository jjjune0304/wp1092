import React from "react";
import { Item } from "../components/TodoItem";

export const List = ({ todos, handleChecked, handleDeleteTask }) => {
  return (
    <ul className="todo-app__list">
      {todos.map((eachTodo) => {
        return (
          <Item
            {...eachTodo}
            key={eachTodo.id}
            onChange={handleChecked}
            onDeleteTask={handleDeleteTask}
          />
        );
      })}
    </ul>
  );
};
