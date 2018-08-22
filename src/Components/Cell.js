import React from 'react'
import "../Styles/style.css"

const Cell = (props) =>  {
    
    // While a functional component, cells can be either a header or a normal cell. 
    // This is determined by the parent 'row' designating to the cell whether it is a head cell

    // Head cells are unique in their styling and in that they have buttons to run the sort!
    return (
            <td className={`table__cell ${props.header ? 'table__cell--header' : ""}`}>
                {props.text || "Nothing!"}
                {props.header && 
                    <span>
                        <span onClick={() => props.sort('asc', props.columnNumber)}>▼</span>
                        <span onClick={() => props.sort('desc', props.columnNumber)}>▲</span>
                    </span>}
            </td>
    )


}

export default Cell;