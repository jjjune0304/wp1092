import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Cell from "../components/Cell";


function FakeSheet() {
    const [size, setSize] = useState({row: 26, col: 100});
    const [index, setIndex] = useState({row: -1, col: -1});
    
    useEffect(() => {
        // change background color of index row and column
        for (var i=0; i<size.row; i++) {
           let row_id = "row_" + (i+1).toString();
           if (i === index.col) document.getElementById(row_id).style.backgroundColor = "#b8b8b8";
           else document.getElementById(row_id).style.backgroundColor = "#dee2e6";
        }
        for (var j=0; j<size.col; j++) {
            let col_id = "col_" + (j).toString();
            if (j === index.row) document.getElementById(col_id).style.backgroundColor = "#b8b8b8";
            else document.getElementById(col_id).style.backgroundColor = "#dee2e6";
        }
    });

    const initialTableList = () => {
        let table_list = [];
        for (var i=0; i < size.col; i++) {
            let row_list = [];
            for (var j=0; j < size.row; j++) {
                row_list.push({readonly: true, highlight: false});
            }
            table_list.push(row_list);
        }
        return table_list;
    }
    const initialLastCol = () => {
        let last_list = [];
        for (var i=0; i < size.row; i++) last_list.push([]);
        return last_list;
    }
    const initialLastRow = () => {
        let last_list = [];
        for (var i=0; i < size.col; i++) last_list.push([]);
        return last_list;
    }

    const [tableList, setTableList] = useState(initialTableList());
    
    const [lastCol, setLastCol] = useState(initialLastCol());
    // assign last col value
    useEffect(() => {
        for (var l=0; l<size.row; l++) {
            let last_id = "input_"+(size.col-1).toString()+"_"+(l).toString();
            document.getElementById(last_id).value = lastCol[l];
        }
    }, [lastCol]);

    const [lastRow, setLastRow] = useState(initialLastRow());
    // assign last row value
    useEffect(() => {
        for (var l=0; l<size.col; l++) {
            let last_id = "input_"+(l).toString()+"_"+(size.row-1).toString();
            document.getElementById(last_id).value = lastRow[l];
        }
    }, [lastRow]);
    
    const addColumn = (event) => {
        let now_row = index.row;
        let now_col = index.col;
        
        let newTableList = tableList;
        let new_row_list = [];
        for (var k=0; k < size.row; k++) {
            new_row_list.push({readonly: true, highlight: false});
        }
        newTableList.push(new_row_list);
        
        let new_last_col = [];

        if (now_row !== -1) {
            for (var l=0; l<size.row; l++) {
                let last_id = "input_"+(size.col-1).toString()+"_"+(l).toString();
                new_last_col.push(document.getElementById(last_id).value);
            }
            for (var i=size.col-2; i>=now_row; i--) {
                for (var j=size.row-1; j>=0; j--) {
                    let prev_id = "input_"+(i).toString()+"_"+(j).toString();
                    let next_id = "input_"+(i+1).toString()+"_"+(j).toString();
                    let content = document.getElementById(prev_id).value;
                    document.getElementById(next_id).value = content;
                    if (i === now_row) {
                        document.getElementById(prev_id).value = "";
                    }
                }
            }
            if (now_row === size.col-1) {
                for (var n=size.row-1; n>=0; n--) {
                    let prev_id = "input_"+(now_row).toString()+"_"+(n).toString();
                    document.getElementById(prev_id).value = "";
                }
            }
        }
        else {
            for (var m=0; m<size.row; m++) {
                new_last_col.push([""]);
            }
        }

        setSize({row: size.row, col: size.col + 1});
        setIndex({row: now_row, col: now_col})
        setTableList(newTableList);
        setLastCol(new_last_col);

        event.stopPropagation();
    }

    const delColumn = (event) => {
        let now_row = index.row;
        let now_col = index.col;
        
        let newTableList = tableList;
        
        if (now_row !== -1) {
            for (var i=now_row+1; i<size.col; i++) {
                for (var j=size.row-1; j>=0; j--) {
                    let prev_id = "input_"+(i).toString()+"_"+(j).toString();
                    let next_id = "input_"+(i-1).toString()+"_"+(j).toString();
                    let content = document.getElementById(prev_id).value;
                    document.getElementById(next_id).value = content;
                }
            }
            now_row = (now_row === size.col-1) ? -1 : now_row;
            now_col = (now_row === -1) ? -1 : now_col;
            newTableList.pop();
            setSize({row: size.row, col: size.col - 1});
            setIndex({row: now_row, col: now_col});
            setTableList(newTableList);
        }

        event.stopPropagation();
    }

    const addRow = (event) => {
        let now_row = index.row;
        let now_col = index.col;
        
        let newTableList = tableList;
        for (var k=0; k < size.col; k++) {
            newTableList[k].push({readonly: true, highlight: false});
        }
        let new_last_row = [];

        if (now_col !== -1) {
            for (var l=0; l<size.col; l++) {
                let last_id = "input_"+(l).toString()+"_"+(size.row-1).toString();
                new_last_row.push(document.getElementById(last_id).value);
            }
            for (var j=size.row-2; j>=now_col; j--) {
                for (var i=size.col-1; i>=0; i--) {
                    let prev_id = "input_"+(i).toString()+"_"+(j).toString();
                    let next_id = "input_"+(i).toString()+"_"+(j+1).toString();
                    let content = document.getElementById(prev_id).value;
                    document.getElementById(next_id).value = content;
                    if (j === now_col) {
                        document.getElementById(prev_id).value = "";
                    }
                }
            }
            if (now_col === size.row-1) {
                for (var n=size.col-1; n>=0; n--) {
                    let prev_id = "input_"+(n).toString()+"_"+(now_col).toString();
                    document.getElementById(prev_id).value = "";
                }
            }
        }
        else {
            for (var m=0; m<size.col; m++) {
                new_last_row.push([""]);
            }
        }

        setSize({row: size.row + 1, col: size.col});
        setIndex({row: now_row, col: now_col})
        setTableList(newTableList);
        setLastRow(new_last_row);

        event.stopPropagation();
    }

    const delRow = (event) => {
        let now_row = index.row;
        let now_col = index.col;
        
        let newTableList = tableList;
        
        if (now_col !== -1) {
            for (var j=now_col+1; j<size.row; j++) {
                for (var i=size.col-1; i>=0; i--) {
                    let prev_id = "input_"+(i).toString()+"_"+(j).toString();
                    let next_id = "input_"+(i).toString()+"_"+(j-1).toString();
                    let content = document.getElementById(prev_id).value;
                    document.getElementById(next_id).value = content;
                }
            }
            now_col = (now_col === size.row-1) ? -1 : now_col;
            now_row = (now_col === -1) ? -1 : now_row;
            for (var k=0; k < size.col; k++) {
                newTableList[k].pop();
            }
            setSize({row: size.row - 1, col: size.col});
            setIndex({row: now_row, col: now_col});
            setTableList(newTableList);
        }

        event.stopPropagation();
    }

    const handleClick = (row, col, event) => {
        let newTableList = tableList;
        let prev_row = index.row;
        let prev_col = index.col;

        if (prev_row === row && prev_col === col) {
            newTableList[prev_row][prev_col].readonly = false;
        }
        else if (prev_row !== -1) {
            newTableList[prev_row][prev_col].readonly = true;
            newTableList[prev_row][prev_col].highlight = false;
        }
        newTableList[row][col].highlight = true;

        setIndex({row: row, col: col});
        setTableList(newTableList);

        event.stopPropagation();
    }

    const handleKeyDown = (row, col, event) => {
        let newTableList = tableList;
        let is_read_only = tableList[row][col].readonly;
        let new_row = row;
        
        if (event.key === "Enter") {
            newTableList[row][col].readonly = true;

            if (row+1 !== size.col) {
                newTableList[row][col].highlight = false;
                newTableList[row + 1][col].highlight = true;
                new_row = new_row + 1;
            }

            let next_id = "input_"+(new_row).toString()+"_"+(col).toString();
            document.getElementById(next_id).focus();
        }
        else if (is_read_only === true) {
            event.target.value = '';
            newTableList[row][col].readonly = false;
        }

        setIndex({row: new_row, col: col});
        setTableList(newTableList);

        event.stopPropagation();
    }

    const handleClickOutside = (event) => {
        let newTableList = tableList;
        let prev_row = index.row;
        let prev_col = index.col;
        
        if (prev_row !== -1) {
            newTableList[prev_row][prev_col].readonly = true;
            newTableList[prev_row][prev_col].highlight = false;
        }
        
        setIndex({row: -1, col: -1});
        setTableList(newTableList);       
    }

    // construct header index "A, B, C, ..., AA, AB, AC, ..."
    let header_list = [''];
    for (var i=0; i < size.row; i++) {
        let alphabet_index = '';

        if (i < 26) {
            alphabet_index = alphabet_index + String.fromCharCode(i+65);
        }
        else if (i < 26*26 + 26) {
            alphabet_index = alphabet_index + String.fromCharCode(parseInt(i/26)+64);
            alphabet_index = alphabet_index + String.fromCharCode(parseInt(i%26)+65);
        }
        else alphabet_index = alphabet_index + i.toString();
        header_list.push(alphabet_index);
    }
    

    return (
        <>
            <Header text='' />
            <div className = "row_bar" onClick={handleClickOutside}>
                <button className="change_row_buttons" onClick={addRow} id="add_row">+</button>
                <button className="change_row_buttons" onClick={delRow}>-</button>
            </div>
            <div>
                <div className = "column_bar" onClick={handleClickOutside}>
                    <button className="change_col_buttons" onClick={addColumn} id="add_col">+</button>
                    <button className="change_col_buttons" onClick={delColumn}>-</button>
                </div>
                <div className = "table_block" onClick={handleClickOutside}>
                    <table>
                        <tr>
                            {header_list.map((i, idx)=>(<td className = "row_idx_list" id={"row_"+(idx).toString()}>{i}</td>))}
                        </tr>
                        {tableList.map((row, row_idx)=>(
                        <tr>
                            <td className = "column_idx_list" id={"col_"+(row_idx).toString()}>{(row_idx+1).toString()}</td>
                            {row.map((item, idx)=>(<Cell row={row_idx} col={idx} readOnly={item.readonly} highLight={item.highlight} handleClick={handleClick} handleKeyDown={handleKeyDown} />))}
                        </tr>))}
                    </table>     
                </div>
                
            </div>
            
        </>
    );
}

export default FakeSheet;

