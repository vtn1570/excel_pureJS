import {storage} from "@/core/utils"
import {defaultStyles} from "../../constants"

const defaultState = {
    title: 'Новая таблица',
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
}


export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
