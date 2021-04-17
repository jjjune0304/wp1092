import React, { Component } from "react";
import Header from "../components/Header";
// import Sheet from "../components/Sheet";


class FakeSheet extends Component {
    constructor(props) {
        
    }
    render() {
        return (
            <>
                <table width="100%">
                    <tr>
                        <td></td>
                        <td colSpan="1000">
                            <button> + </button>
                            <button> - </button>
                        </td>
                    </tr>
                    <tr> 
                        <td rowSpan="0">
                            <button> + </button>
                            <button> - </button>
                        </td>
                        <td>
                            <table>
                                <tr> 
                                    <td className="sheet_cell"></td>
                                    <td className="sheet_cell"></td>
                                </tr>
                                <tr> 
                                    <td className="sheet_cell"></td>
                                    <td className="sheet_cell"></td>
                                </tr>
                                <tr> 
                                    <td className="sheet_cell"></td>
                                    <td className="sheet_cell"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </>
        );
    }
}

export default FakeSheet;

