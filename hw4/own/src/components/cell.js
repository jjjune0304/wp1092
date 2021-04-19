import React, {Component} from "react";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.box = React.createRef();
        this.clickCount = 0;
        this.singleClickTimer = '';
        this.state = { editing: false };
    }

    render() {
        const { className, value, onChange, select} = this.props;
        return  <td className={className+(select?" select":"")}> { this.state.editing ?
                    <input ref={this.input} value={value} readOnly={!this.state.editing}
                        onChange={e => onChange(e.target.value, !this.state.editing)}
                        onKeyUp={e => e.key=='Enter'?this.handleEnter():""}
                        onBlur={this.onBlur} /> : 
                    <div ref={this.box} tabIndex="-1" className="content-box" 
                        onKeyUp={e => this.handleKeyUp(e)}
                        onClick={this.handleClick} onBlur={this.onBlur}>{value}</div> }
                </td>
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.select && this.props.select !== prevProps.select) {
            this.box.current.focus();
        }
    }

    handleEnter = () => {
        this.onBlur();
        this.props.selectNext();
    };

    handleClick = (e) => {
        if (e.detail === 1) {
            // this.setState({ selected: true});
            this.box.current.focus();
            this.props.handleSelect(false);
        } else if (e.detail === 2) {
            this.onFocus();
        }
    };

    handleKeyUp = (e) => {
        console.log(e.key);
        if (e.key != 'Enter') {
            this.props.onChange(e.key, !this.state.editing); // clear text
        }
        if (e.key != 'Delete' && e.key != 'Backspace'){
            this.onFocus();
            this.props.onChange(e.key, false);
        }
    };

    onFocus = () => {
        this.setState({ editing: true }, () => {
            this.input.current.focus();
        })
    };

    onBlur = () => { 
        this.setState({ editing: false });
        this.props.handleSelect(true); // reset = true
    };
}
export default Cell;