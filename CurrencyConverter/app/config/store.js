import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';  //return combineReducers di index.js

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {  //jika ini di development
    middleware.push(logger); //selalu dipush terakhir
}

const store = createStore(reducers, applyMiddleware(...middleware)); 
sagaMiddleware.run(rootSaga);
//logger untuk debugging redux
export default store;
