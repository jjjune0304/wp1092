import React from "react";
export default ({className, num, select, letter}) => {
    let s = "";
    if (letter) {
        if(num > 26){
            s = s + String.fromCharCode(64 + Math.floor(num / 26));
            num = num % 26;
        }
        s = s + String.fromCharCode(64 + num);
    } else {
        s = num;
    }
    return <td className={className+(select?" select":"")}> {s} </td>;
}
