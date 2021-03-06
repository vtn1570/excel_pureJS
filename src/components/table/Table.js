import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/DOM'
import {matrix, nextSelector} from './table.functions'
import {resizeHandler} from './table.resize'
import {isCell, shoulResize} from './table.functions'
import {createTable} from './table.template'
import {TableSelection} from './TableSelection'
import {changeText} from '@/redux/actions'
import {defaultStyles} from '../../../constants'
import {applyStyle, changeStyles} from '../../redux/actions'
import {parse} from '../../core/parse'

export class Table extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__table'

        constructor($root, options) {
            super($root, {
                name: 'Table',
                listeners: ['mousedown', 'keydown', 'input'],
                ...options,
            })
        }

    toHTML() {
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula: input', (value) => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula: done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value)
            this.$dispatch(applyStyle({
                value,
                ids: this.selection.selectedIds,
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(changeStyles(styles))
    }

    async resizeTable(event) {
            const data = await resizeHandler(this.$root, event)
            if (data.type === 'col') {
                this.$dispatch({type: 'COL_RESIZE', data})
            } else {
                this.$dispatch({type: 'ROW_RESIZE', data})
            }
    }

    onMousedown(event) {
        if (shoulResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map((el) => this.$root.find(`[data-id="${el}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp',
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(changeText({
            id: this.selection.current.id(),
            value,
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}

