import {range} from "../../core/utils"

export function shoulResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix(target, current) {
    const $target = target.id(true)
    const $current = current.id(true)

    const cols = range($current.col, $target.col)
    const rows = range($current.row, $target.row)
    return rows.reduce((acc, row) => {
        cols.forEach((col) => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {row, col}) {
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col--
            break
        case 'ArrowUp':
            row--
            break
    }

    return `[data-id="${row >= 0 ? row : 0}:${col >= 0 ? col : 0}"]`
}
