import {defaultStyles} from "../../../constants"
import {parse} from "../../core/parse"
import {toInlineStyles} from "../../core/utils"

const CODES = {
    A: 65,
    Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createRow(index, content, state) {
    const resizer = index
    ? `<div class="row-resize" 
    data-resize="row" 
    data-row = "${index}"
    >
    </div>`
    : ''
    return `
        <div class="row" 
        data-type = "resizable" 
        style="height: ${getHeight(state, index)}"
        >               
            <div class="row-info">
            ${index ? index : ''}
            ${resizer}
            </div>
            <div class="row-data">${content}</div> 
        </div>
    `
}

function createCol(charCode, num, width) {
    return `
    <div class="column" data-type="resizable"" style="width: ${width}">
    ${charCode}
    <div class="col-resize" data-resize="col" data-number_col = "${num}"></div>
    </div>
    `
}

function createCell(state, row, num) {
    const id = `${row}:${num}`
    const data = state.dataState[id]
    const width = getWidth(state.colState, num)
    const styles = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id],
    })
    return `
    <div
        class="cell" 
        contenteditable 
        data-number_cell = "${num}" 
        data-type = "cell"
        data-id= "${id}"
        data-value = "${data || ''}"
        style="${styles}; width:${width}"
    >${parse(data || '')}</div>
    `
}

function getWidth(state, i) {
    return (state[i] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, i) {
    return (state[i] || DEFAULT_HEIGHT) + 'px'
}
export function createTable(rowsCount = 10, state = {}) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = []


// create columns

    for ( let i = 0; i <= colsCount; i++) {
        const width = getWidth(state.colState, i)
        cols.push(createCol(String.fromCharCode(65+i), i, width))
    }

// create row

    rows.push(createRow(null, cols.join(''), {}))

    for ( let row = 0; row < rowsCount; row++ ) {
        const cells = new Array(colsCount+1)
        .fill('')
        .map((_, num) => createCell(state, row, num))
        .join('')
        rows.push(createRow( row+1, cells, state.rowState))
    }
    return rows.join('')
}
