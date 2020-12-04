const CODES = {
    A: 65,
    Z: 90,
}

function createRow(index, content ) {
    const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''
    return `
        <div class="row" data-type = "resizable">               
            <div class="row-info">
            ${index ? index : ''}
            ${resizer}
            </div>
            <div class="row-data">${content}</div> 
        </div>
    `
}

function createCol(charCode, num) {
    return `
    <div class="column" data-type="resizable"">
    ${charCode}
    <div class="col-resize" data-resize="col" data-number_col = "${num}"></div>
    </div>
    `
}

function createCell(row) {
    return (_, num) => `
    <div
        class="cell" 
        contenteditable 
        data-number_cell = "${num}" 
        data-id= "${row}:${num}"
        data-type = "cell"
    ></div>
    `
}

export function createTable(rowsCount = 0) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = []

// create columns

    for ( let i = 0; i <= colsCount; i++) {
        cols.push(createCol(String.fromCharCode(65+i), i))
    }

// create row

    rows.push(createRow(null, cols.join('')))

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => creareCell(row, col))
        .map(createCell(row))
        .join('')
        rows.push(createRow( row+1, cells))
    }
    return rows.join('')
}
