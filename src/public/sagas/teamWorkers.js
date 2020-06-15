import { put, call } from 'redux-saga/effects';
import _ from 'lodash';

import {
    getTeamSucceeded
} from '../actions/teamActions';

const getTeamAPI = (user) => {
    return (async () => {
        const response = await fetch('/team');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    })();
}

export function* asyncGetTeam() {
    const team = yield call(getTeamAPI);
    yield put(getTeamSucceeded( _.map(team, teammate => { return { label: teammate.name } } ) ));
}
