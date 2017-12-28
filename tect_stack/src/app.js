import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'; //untuk penampung store (<provider>store>state<store<provider>)
import { createStore } from 'redux';    //untuk penampung state (<store>state<store>)
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList';

const App = () => {
    return (
        // provider hanya boleh punya 1 children
        <Provider store={createStore(reducers)}>  
        {/* reducers return data berupa state, disimpan di store, ditampung di provider */}
            <View>
                <Header headerTitle="Tech Stack" />
                <LibraryList />   
                {/* state dari provider dilempar ke LibraryList via connect */}  
            </View>
        </Provider>
    );
};

export default App;
