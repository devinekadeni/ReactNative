import { combineReducers } from 'redux';
import LibraryReducer from './LibraryReducer';

export default combineReducers({  //tempat seluruh reducer disatukan
    //key = libraries, val = libraryReducer (json)
    libraries2: LibraryReducer
});
