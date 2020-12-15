import {$} from '@core/dom'
import {ActiveRoute} from './ActiveRoute'
// import {ActiveRoute} from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.init()
        this.changePageHandler = this.changePageHandler.bind(this)
        this.page = null
    }
    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    changePageHandler(event) {
        event ? document.location.reload() : ''
        if (this.page) {
            this.page.destroy()
        }
        // document.location.reload();

        this.$placeholder.clear()

        const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard

        this.page = new Page(ActiveRoute.param)

        this.$placeholder.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}
