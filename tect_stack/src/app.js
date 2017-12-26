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
            <View>
                <Header headerTitle="Tech Stack" />
                <LibraryList />     
            </View>
        </Provider>
    );
};

export default App;
