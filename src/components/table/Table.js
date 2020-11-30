import {ExcelComponent} from '@core/ExcelComponent'
import {resizeHandler} from './resizeHandler'
import {shoulResize} from './should.resize'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__table'

        constructor($root) {
            super($root, {
                listeners: ['mousedown'],
            })
        }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shoulResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}
