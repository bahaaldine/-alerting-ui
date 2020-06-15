import initialState from './initialState';

import {
    GET_TEAM_SUCCEEDED
} from '../actions/actionTypes';

export default function team(team = initialState.team, action) {
    let newTeam = [
        ...team
    ]
    switch (action.type) {
        case GET_TEAM_SUCCEEDED:
            newTeam = [
                ...action.team,
            ]
            return newTeam;
        default:
            return newTeam;
    }
}
