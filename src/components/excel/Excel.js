import {$} from '@core/DOM.js'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
// с большой буквы  потому ,что это элемент класс конструктор
        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            // // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach((component) => component.init())
    }
}
