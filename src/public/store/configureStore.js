import { createStore, compose, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import { rootSaga } from '../sagas/watchers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const level = 'log';
const loggerMiddleware = createLogger({
    collapsed: true
    , level
});

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeEnhancer(
            applyMiddleware(
                sagaMiddleware
                , loggerMiddleware
            )
        ),
    );
    sagaMiddleware.run(rootSaga)
    return store;
}


