import React, { Component } from "react";
import { useState, useEffect } from 'react';
import Table from "../components/Table";

function Button(props) {
    const [cell, setCell] = useState([-1,-1]);
    const {changeData, handleSelect, text} = props;
    let handleMouseDown = () => {
        let select_cell = changeData();
        setCell(select_cell);
    };
    let handleClick = (e) => {
        e.currentTarget.blur();
        console.log(cell);
        if(cell[0] !== -1 && cell[1] !== -1) handleSelect(cell[0],cell[1],false);
    };
    return <button className="button" onMouseDown={handleMouseDown} 
            onClick={(e) => handleClick(e)}> {text}
            </button>;
}

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        let row_header = new Array(100).fill(false); // row header is selected
        let col_header = new Array(26).fill(false); // col header is selected
        let select_data = new Array(100).fill("").map(() => new Array(26).fill(false)); // cell is selected
        let data = new Array(100).fill("").map(() => new Array(26).fill(""));
        this.state = {
            data: data,
            row_header: row_header,
            col_header: col_header,
            select_data: select_data,
            select_row: -1,
            select_col: -1
        };
    }

    render() {
        return (
            <>
                <div className="container">
                    <div id="row-header">
                        <Button changeData={this.AddRow} handleSelect={this.handleSelect} text="+" />
                        <Button changeData={this.RemoveRow} handleSelect={this.handleSelect} text="-" />
                    </div>
                    <div className="col-wrapper">
                        <div id="col-header">
                            <Button changeData={this.AddCol} handleSelect={this.handleSelect} text="+" />
                            <Button changeData={this.RemoveCol} handleSelect={this.handleSelect} text="-" />
                        </div>
                        <div id="table-container">
                            <Table data={this.state.data} row_header={this.state.row_header}
                                col_header={this.state.col_header} selected={this.state.select_data}
                                handleSelect={this.handleSelect} handleChangeEvent={this.handleChangeEvent}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    AddRow = () => {
        let row_num = this.state.row_header.length + 1;
        let col_num = this.state.col_header.length;
        let new_data = this.state.data.slice(0);
        let new_row = new Array(row_num).fill(false);
        let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
        let row = this.state.select_row;
        console.log("Add Row: "+row);
        if (row !== -1) {
            new_data.splice(row, 0, Array(col_num).fill(false)); // add one row
        } else {
            new_data.splice(row_num, 0, Array(col_num).fill(false)); // add one row at bottom
        }
        this.setState({ data: new_data, row_header: new_row,
                    select_data: new_select,select_row: -1 });
        return [row, this.state.select_col];
    };

    RemoveRow = () => {
        let row = this.state.select_row;
        console.log("Remove Row: "+row);
        if (row !== -1) {
            let row_num = this.state.row_header.length - 1;
            let col_num = this.state.col_header.length;
            let new_data = this.state.data.slice(0);
            let new_row = new Array(row_num).fill(false);
            let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
            new_data.splice(row, 1); // remove one row
            this.setState({ data: new_data, row_header: new_row,
                select_data: new_select,select_row: -1 });
        }
        return [row, this.state.select_col];
    };

    AddCol = () => {
        let row_num = this.state.row_header.length;
        let col_num = this.state.col_header.length + 1;
        let new_data = this.state.data.slice(0);
        let new_col = new Array(col_num).fill(false);
        let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
        let col = this.state.select_col;
        console.log("Add Col: "+col);
        if (col !== -1) {
            for (let i = 0; i < row_num; i++) {
                new_data[i].splice(col, 0, false); // add one new col
            }
        } else {
            for (let i = 0; i < row_num; i++) {
                new_data[i].splice(col_num, 0, false); // add one new col
            }
        }
        this.setState({ data: new_data, col_header: new_col,
                    select_data: new_select,select_col: -1 });
        return [this.state.select_row, col];
    };

    RemoveCol = () => {
        let col = this.state.select_col;
        console.log("Remove Col: "+col);
        if (col !== -1) {
            let row_num = this.state.row_header.length;
            let col_num = this.state.col_header.length - 1;
            let new_data = this.state.data.slice(0);
            let new_col = new Array(col_num).fill(false);
            let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
            for (let i = 0; i < row_num; i++) {
                new_data[i].splice(col, 1); // remove one col
            }
            this.setState({ data: new_data, col_header: new_col,
                select_data: new_select, select_col: -1 });
        }
        return [this.state.select_row, col];
    };

    handleChangeEvent = (value, clear, row_id, col_id) => {
        let newState = this.state.data.slice(0);
        console.log(value);
        if (clear) {
            newState[row_id][col_id] = String("");
        } else {
            newState[row_id][col_id] = String(value);
        }
        this.setState({data: newState});
    };

    handleSelect = (i, j, reset) => {
        let row_num = this.state.data.length;
        let col_num = this.state.data[0].length;
        if (i >= row_num) i = row_num - 1;
        let new_row = new Array(row_num).fill(false);
        let new_col = new Array(col_num).fill(false);
        let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
        var row = -1, col = -1;
        if (!reset) {
            new_row[i] = true;  new_col[j] = true;
            new_select[i][j] = true;
            row = i; col = j;
        }
        console.log("selectR"+i+"C"+j+"reset"+reset);
        this.setState({ row_header: new_row, col_header: new_col,
                        select_data: new_select,
                        select_row: row, select_col: col });
    };
}

export default FakeSheet;

