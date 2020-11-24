const CODES = {
    A: 65,
    Z: 90,
}

function createRow(infoNumber, content ) {
    return `
        <div class="row">               
            <div class="row-info">${infoNumber ? infoNumber : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function createCol(charCode) {
    return `
    <div class="column">
    ${charCode}
    </div>
    `
}

function createCell() {
    return `
    <div class="cell "contenteditable=""></div>
    `
}

export function createTable(rowsCount = 100) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = []
    const cells = []

// create cells

    for (let i = 0; i <= colsCount; i++) {
        cells.push(createCell())
    }

// create columns

    for ( let i = 0; i <= colsCount; i++) {
        cols.push(createCol(String.fromCharCode(65+i)))
    }

// create row

    rows.push(createRow(null, cols.join('')))
    for ( let i = 0; i < rowsCount; i++ ) {
        rows.push(createRow( i+1, cells.join('')))
    }

    return rows.join('')
}

