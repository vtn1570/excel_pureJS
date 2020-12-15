class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
         if (typeof html === 'string') {
             this.$el.innerHTML = html // innerHTML - переписывает содержимое
             return this // используется для chain
         }
         return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text !== 'undefined') {
        this.$el.textContent = text
        this
        }
        return this.$el.textContent
    }

    clear() {
        this.html('')
        return this
    }

    // eventType - input , click ,mousedown, mousemove

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    closest(element) {
        return $(this.$el.closest(element))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    focus() {
        this.$el.focus()
        return this
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach((key) => {
            this.$el.style[key] = styles[key]
        })
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(":")
            return {
                row: +parsed[0],
                col: +parsed[1],
            }
        }
        return this.data.id
    }
    // node - элемент в JS

    append(node) {
        this.$el.append(node.$el) // новый метод
        return this
    }

    get data() {
        return this.$el.dataset
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}


