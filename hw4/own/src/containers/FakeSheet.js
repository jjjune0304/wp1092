import React, { Component } from "react";
import { useState, useEffect } from 'react';
import Table from "../components/Table";


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
                        <button className="button" onClick={this.handleRowAdd}> + </button>
                        <button className="button"> - </button>
                    </div>
                    <div className="col-wrapper">
                        <div id="col-header">
                            <button className="button"> + </button>
                            <button className="button"> - </button>
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

    handleRowAdd = () => {
        this.setState(prevState => {
            let row_num = prevState.row_header.length + 1;
            let col_num = prevState.col_header.length;
            let new_data = prevState.data.slice(0);
            let new_row = new Array(row_num).fill(false);
            let new_select = new Array(row_num).fill("").map(() => new Array(col_num).fill(false));
            var row = prevState.select_row;
            console.log(row);
            if (row !== -1) {
                new_data.splice(row, 0, Array(col_num).fill(false));
                row = row + 1;
                new_select[row][prevState.select_col] = true;
                new_row[row] = true;
            } else {
                new_data.splice(row_num, 0, Array(col_num).fill(false));
            }
            return {
                    data: new_data,
                    row_header: new_row,
                    select_data: new_select,
                    select_row: row };
        });
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
            console.log("selectR"+i+"C"+j);
            new_row[i] = true;  new_col[j] = true;
            new_select[i][j] = true;
            row = i; col = j;
        }
        console.log("selectR"+row+"C"+col);
        this.setState({ row_header: new_row, col_header: new_col,
                        select_data: new_select,
                        select_row: row, select_col: col });
    };
}

export default FakeSheet;

