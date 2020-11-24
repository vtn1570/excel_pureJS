import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__table'

    toHTML() {
        return createTable()
}
}
