import initialState from './initialState';

import {
    SAVE_ALERT_SUCCEEDED, GET_ALERTS_LIST_SUCCEEDED
} from '../actions/actionTypes';

export default function alertsList(alertsList = initialState.alertsList, action) {
    let newAlertsList = [
        ...alertsList
    ]
    switch (action.type) {
        case SAVE_ALERT_SUCCEEDED:
            newAlertsList = [
                ...alertsList,
            ]
            return newAlertsList;
        case GET_ALERTS_LIST_SUCCEEDED:
            newAlertsList = [
                ...action.alertsList,
            ]
            return newAlertsList;
        default:
            return newAlertsList;
    }
}
