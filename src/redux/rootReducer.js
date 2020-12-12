import {CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from "./types"

export function rootReducer(state, action) {
    let prevState
    let val
    switch (action.type) {
        case 'COL_RESIZE':
            prevState = state.colState || {}
            prevState[action.data.id] = action.data.valueCol
            // не допускается мутация. При помощи спреда созд.новый объект
            return {...state, colState: prevState}
        case 'ROW_RESIZE':
            prevState = state.rowState || {}
            prevState[action.data.id] = action.data.valueRow
            return {...state, rowState: prevState}
        case CHANGE_TEXT:
            prevState = state.dataState || {}
            prevState[action.data.id] = action.data.value
            return {
                ...state,
                currentText: action.data.value,
                dataState: prevState,
            }
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            val = state.stylesState || {}
            action.data.ids.forEach((id) => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                stylesState: val,
                currentStyles: {...state.currentStyles, ...action.data.value},
            }
        case CHANGE_TITLE:
                return {...state, title: action.data}
        default: return state
    }
}
