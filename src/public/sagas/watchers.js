import { takeEvery, all } from 'redux-saga/effects';

import {
  asyncSaveAlert
  , asyncGetAlertsList
} from './alertsListWorkers';

import {
  asyncGetTeam
} from './teamWorkers';

import * as types from '../actions/actionTypes';

function* watchAlertsList(params) {
  yield takeEvery(types.SAVE_ALERT, asyncSaveAlert);
  yield takeEvery(types.GET_ALERTS_LIST, asyncGetAlertsList);
}

function* watchTeam(params) {
  yield takeEvery(types.GET_TEAM, asyncGetTeam);
}

export function* rootSaga() {
  yield all([
    watchAlertsList(),
    watchTeam()
  ])
}