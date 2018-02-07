import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers';  //return combineReducers di index.js

const middleware = [];
if (process.env.NODE_ENV === 'development') {  //jika ini di development
    middleware.push(logger);
}

//logger untuk debugging redux
export default createStore(reducers, applyMiddleware(...middleware)); 
