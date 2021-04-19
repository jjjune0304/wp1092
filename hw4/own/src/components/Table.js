import React from "react";
import Header from './Header';
import Cell from './Cell';
import { useState, useEffect } from 'react';

export default (props) => {
    const {data, row_header, col_header, selected, 
            handleChangeEvent, handleSelect} = props;
    return <table className="fixed-header">
                <thead>
                    <tr>
                        <td className="empty_cell"></td>
                        { col_header.map((x, index) => (
                            <Header key={"h"+index} className="index_cell" 
                                num={index+1} select={x} letter={true}/>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, row_id) => (
                        <tr key={row_id}>
                            <Header className="index_cell" num={row_id+1} 
                                select={row_header[row_id]} letter={false}/>
                            { row.map((cell, col_id) => (
                                <Cell key={"r"+row_id+"c"+col_id} id={"r"+row_id+"c"+col_id} 
                                className="sheet_cell" value={cell} select={selected[row_id][col_id]}
                                handleSelect={(reset) => handleSelect(row_id, col_id, reset)}
                                selectNext={() => handleSelect(row_id+1, col_id, false)}
                                onChange={ (v, clear) => { handleChangeEvent(v, clear, row_id, col_id) }} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>;
}