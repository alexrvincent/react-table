import React from 'react'
import Cell from "./Cell"

const originalData = require('../data.json').data;

const Row = (props) => { 
    // Our row component should only care about one thing - rendering a collection of children
    // I decided to split these out to make it clear that a row is just a collection of cells
        return (
            <tr>
                {
                    props.rowData.map((item, index) => (
                        <Cell sort={props.sort} columnNumber={index} key={`cell-${index}`} header={props.header} text={item}/>
                    ))
                }
            </tr>
        )
}

class Table extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            sortColumn: 0,
            sortOrder: null,
            data: Array.from(originalData)
        }
    }

    sort = (order, colNum) => {

        // Lets create two arrays to track our conversion -
        // 1) sortedArray - to hold a collection of the "sorted" objects denoting the row index/text value of
        //                  where to insert into the newData array. Also holds the fields we're sorting over.
        // 2) newData - the actual new state array we'll give the react component                     
        let sortedArray = [];
        let newData = [];

        // First get the data fields we'll be sorting over and their corresponding row indicies.
        // Place them into an array for quick look up
        for(let i = 1; i < originalData.length; ++i) {
            sortedArray.push(
                {
                    text: originalData[i][colNum], 
                    rowIndex: i
                }
            );
        }

        // Next, mutate the array inline by sorting the objects based on the "text" field.
        // This will give us an array of objects whose rowIndex are in order for constructing the newData
        sortedArray = sortedArray.sort( (a, b) => {
            if(a.text === b.text) return 0;
            else if(a.text < b.text) return -1;
            else return 1;
        })
        
        // Grabbing from the original data source, push on the original rows corresponding to the sorted indicies
        for(let i = 0; i < sortedArray.length; ++i) {
            newData.push(originalData[sortedArray[i].rowIndex]);
        }

        // If the user wished to sort by descending, simply reverse the order of the sorted array
        if(order === 'desc') {
            newData.reverse();
        }

        // Always place the header (zero-eth index as the first item by unshifting it onto the array)
        // Here we can just grab the hard coded header data
        newData.unshift(originalData[0]);

        // Update our React state and wha-la!
        this.setState({data: newData});
    }

    render() {

        // Our table element should always render a table/tbody (for semantic/SEO reasons)
        // It'll iterate/map through the state "data" field and render a collection of rows.
        return (
            <table border="1">
                <tbody>
                {
                    this.state.data.map((rowData, index) => {
                        return <Row sort={this.sort} key={`row-${index}`} header={index === 0} rowData={rowData}/>
                    })
                }
                </tbody>
            </table>
        )
    }


}

export default Table;