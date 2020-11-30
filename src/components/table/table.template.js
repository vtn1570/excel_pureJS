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

function createCell(number) {
    return `
    <div class="cell "contenteditable="" data-number_cell = "${number}"></div>
    `
}

export function createTable(rowsCount = 30) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = []
    const cells = []

// create cells

    for (let i = 0; i <= colsCount; i++) {
        cells.push(createCell(i))
    }

// create columns

    for ( let i = 0; i <= colsCount; i++) {
        // DEBUG
        cols.push(createCol(String.fromCharCode(65+i), i))
    }

// create row

    rows.push(createRow(null, cols.join('')))
    for ( let i = 0; i < rowsCount; i++ ) {
        rows.push(createRow( i+1, cells.join('')))
    }

    return rows.join('')
}

