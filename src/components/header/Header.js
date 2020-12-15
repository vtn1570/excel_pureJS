import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/DOM'
import {ActiveRoute} from '../../core/routes/ActiveRoute'
import {debounce} from '../../core/utils'
import {changeTitle} from '../../redux/actions'

export class Header extends ExcelComponent {
    // static- получение доступа без создания инстанса класса
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options,
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }
    toHTML() {
        const title = this.store.getState().title || 'Новая таблица'
        return `
          <input type="text" class="input" value="${title}" />

        <div>
            <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove">delete</i>
            </div>

            <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>
        </div>`
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить таблицу?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        console.log('oninput')
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.$el.value))
    }
}
