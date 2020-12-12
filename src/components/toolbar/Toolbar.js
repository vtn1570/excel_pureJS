import {createToolbar} from './toolbar.template'
import {$} from '@core/DOM.js'
import {ExcelStateComponent} from '../../core/ExcelStateComponent'
import {defaultStyles} from '../../../constants'

export class Toolbar extends ExcelStateComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options,
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
        console.log(changes)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            console.log($target)
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }
}
