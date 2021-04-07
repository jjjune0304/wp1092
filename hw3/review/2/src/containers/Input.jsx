import React from "react";

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    this.setState({
      input: value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter" && this.state.input.trim().length !== 0) {
      this.props.createTodo(this.state.input);
      this.setState({
        input: "",
      });
    }
  };

  render() {
    return (
      <input
        className="todo-app__input"
        placeholder="What needs to be done?"
        onKeyPress={this.handleKeyPress}
        onChange={this.handleInputChange}
        value={this.state.input}
      />
    );
  }
}

export default Input;
