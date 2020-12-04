export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // уведомляем слушателей если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach((listener) => {
            listener(...args)
        })
    }

    // Подписываемся на уведомления
    // Добавляем нового слушателя
    //
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
               this.listeners[event].filter((listener) => listener !== fn)
               console.log('sssss')
        }
    }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('Andre', (data) => console.log('Sub:', data))

// setTimeout(() => {
//     emitter.emit('Andre', '2 sec')
// }, 2000);
// setTimeout(() => {
//     unsub()
// }, 3000);
// setTimeout(() => {
//     console.log(emitter.listeners)
// }, 4000);
// // console.log(emitter.listeners['Andre'])

