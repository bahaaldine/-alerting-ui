import { put, call } from 'redux-saga/effects';
import _ from 'lodash';

import {
    saveAlertSuccess,
    getAlertsListSuccess
} from '../actions/alertActions';

const saveAlertAPI = (action) => {
    const options = {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    };
    return (async () => {
        const response = await fetch('/alert', options);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body.libraries;
    })();
} 

export function* asyncSaveAlert(action) {
    yield call(saveAlertAPI, action);
    yield put(saveAlertSuccess(action.payload));
}


const getAlertsListAPI = (user) => {
    return (async () => {
        const response = await fetch('/alerts-list');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    })();
}

export function* asyncGetAlertsList() {
    const alertsList = yield call(getAlertsListAPI);
    yield put(getAlertsListSuccess(alertsList));
}
