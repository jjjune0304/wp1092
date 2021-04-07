import React from "react";
export const Header = ({ text }) => (
  <header className="todo-app__header">
    <h1 className="todo-app__title">{text}</h1>
  </header>
);
