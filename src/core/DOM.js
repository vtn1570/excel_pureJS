class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
         if (typeof html === 'string') {
             this.$el.innerHTML = html
             return this // используется для chain
         }
         return this.$el.outerHTML.trim()
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

    // node - элемент в JS

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
      if (Element.prototype.append) {
          this.$el.append(node)
      } else {
          this.$el.appendChild(node)
      }
      return this
    }
}

// $('div').html('<h1>Test</h1>').clear()

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


