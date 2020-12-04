import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        })
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('.input')
        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit('it is working', text)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula: done')
        }
    }
}
