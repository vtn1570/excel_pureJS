import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {storage} from '@core/utils'
import {Page} from "../core/Page";
import {normalizeInitialState} from '../redux/initialState'

function storageName(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()

        const state = storage(storageName(params))
        const store = createStore(normalizeInitialState(state))

        store.subscribe((state) => {
        storage(storageName(params), state)
        })

        this.excel = new Excel({
        components: [Header, Toolbar, Formula, Table],
        store,
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}
