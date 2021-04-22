import React, { useState, useEffect } from "react";

function Cell(props) {
    let cellStyle = (props.highLight === true) ? {
        outlineOffset: '0px',
        outlineColor: 'blue',
        outlineWidth: '2px',
        outlineStyle: 'solid',
        backgroundColor: '#c0ffff'
    } : {};
    
    return(	
		<td onClick={(event) => {props.handleClick(props.row, props.col, event)}} onKeyDown={(event) => {props.handleKeyDown(props.row, props.col, event)}}>
            <input id={"input_"+(props.row).toString()+"_"+(props.col).toString()} type="text" className="fakesheet__cell" readOnly={props.readOnly} style={cellStyle} />
        </td>
        
	);
}

export default Cell;