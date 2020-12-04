import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/DOM'
import {matrix, nextSelector} from './table.functions'
import {resizeHandler} from './resizeHandler'
import {isCell, shoulResize} from './table.functions'
import {createTable} from './table.template'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__table'

        constructor($root, options) {
            super($root, {
                name: 'Table',
                listeners: ['mousedown', 'keydown'],
                ...options,
            })
        }

    toHTML() {
        return createTable(20)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)

        this.$on('it is working', (text) => {
            this.selection.current.text(text)
            console.log('formula: input', text)
        })
        this.$on('formula: done', () => {
            this.selection.current.focus()
        })
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (shoulResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map((el) => this.$root.find(`[data-id="${el}"]`))
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($target)
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
            this.selection.select($next)
            this.$emit('table:select', $next)
        }
    }
}

