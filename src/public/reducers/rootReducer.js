import { combineReducers } from 'redux';
import alertsList from './alertReducer';
import team from './teamReducer';

const rootReducer = combineReducers ({
    alertsList
    , team
});

export default rootReducer;