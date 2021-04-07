import React, { Component } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { List } from "../components/TodoList";
import Input from "../containers/Input";

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      idCounter: 0,
      // 初始都在ALL mode
      mode: "All",
      todos: [],
    };
  }

  createTodo = (message) => {
    this.setState((prevState) => {
      const idCounter = prevState.idCounter + 1;
      return {
        idCounter: idCounter,
        mode: prevState.mode,
        todos: [
          ...prevState.todos,
          {
            id: idCounter,
            task: message,
            isCompleted: false,
          },
        ],
      };
    });
  };

  handleClick = (e) => {
    this.setState({ mode: e.target.name });
  };

  handleClear = () => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.filter((eachTodo) => !eachTodo.isCompleted),
        mode: "All",
      };
    });
  };

  handleDeleteTask = (e) => {
    let index = this.state.todos.findIndex((element) => {
      return element.id === Number(e.target.id);
    });
    const updatedTodo = [...this.state.todos];

    updatedTodo.splice(index, 1);
    this.setState({ todos: updatedTodo });

    if (updatedTodo.length === 0) {
      this.setState({
        idCounter: 0,
        mode: "All",
      });
    }
  };

  handleChecked = (e) => {
    let newTodos = [...this.state.todos];
    let index = this.state.todos.findIndex((element) => {
      return element.id === Number(e.target.id);
    });

    newTodos[index] = {
      ...this.state.todos[index],
      isCompleted: !newTodos[index].isCompleted,
    };

    this.setState({
      todos: newTodos,
    });
  };

  render() {
    const { todos, mode } = this.state;
    const newTodos =
      mode === "Active"
        ? todos.filter((eachTodo) => !eachTodo.isCompleted)
        : mode === "Completed"
        ? todos.filter((eachTodo) => eachTodo.isCompleted)
        : todos;

    const finishedTodosNum = todos.filter((eachTodo) => eachTodo.isCompleted)
      .length;
    const unfinishedTodosNum = todos.filter((eachTodo) => !eachTodo.isCompleted)
      .length;
    return (
      <>
        <Header text="todos" />
        <section className="todo-app__main">
          <Input createTodo={this.createTodo} />
          {todos.length !== 0 && (
            <List
              todos={newTodos}
              handleChecked={this.handleChecked}
              handleDeleteTask={this.handleDeleteTask}
            />
          )}
        </section>
        {todos.length !== 0 && (
          <Footer
            mode={mode}
            finishedTodosNum={finishedTodosNum}
            unfinishedTodosNum={unfinishedTodosNum}
            handleClick={this.handleClick}
            handleClear={this.handleClear}
          />
        )}
      </>
    );
  }
}

export default TodoApp;
