import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
    }
    // Настраиваем наш компонент до init
    prepare() {}
    // возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про события
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // подписываемся на событие event
    $on(event, fn) {
        this.emitter.subscribe(event, fn)
        // this.unsubscribers.push(unsub)
    }
    // Инициализируем компонент
    // Добавлеяем DOM слушателей
    init() {
        this.initDOMListeners()
    }
    // Удалеем компонент
    // Чистим слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach((unsub) => unsub())
    }
}

