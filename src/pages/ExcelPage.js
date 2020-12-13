import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {storage} from '@core/utils'
import {initialState} from '@/redux/initialState'
import {Page} from "../core/Page";

export class ExcelPage extends Page {
    getRoot() {
        const store = createStore(initialState)

        store.subscribe((state) => {
        console.log('app state:', state)
        storage('excel-state', state)
        })

        const excel = new Excel('#app', {
        components: [Header, Toolbar, Formula, Table],
        store,
        })

        return excel.render()
    }
}
