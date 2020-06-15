import * as types from './actionTypes';

export function getAlertsList() {
    return { type: types.GET_ALERTS_LIST };
}

export function getAlertsListSuccess(payload) {
    return { type: types.GET_ALERTS_LIST_SUCCEEDED, alertsList: payload };
}

export function saveAlert(payload) {
    return { type: types.SAVE_ALERT, payload: payload };
}

export function saveAlertSuccess(payload) {
    return { type: types.SAVE_ALERT_SUCCEEDED, payload: payload };
}