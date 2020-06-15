import * as types from './actionTypes';

export function getTeam() {
    return { type: types.GET_TEAM };
}

export function getTeamSucceeded(payload) {
    return { type: types.GET_TEAM_SUCCEEDED, team: payload };
}