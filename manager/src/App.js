import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyC10TangG6c3LYs_wgSW2qqsNlYW19u4bM',
            authDomain: 'manager-9b08d.firebaseapp.com',
            databaseURL: 'https://manager-9b08d.firebaseio.com',
            projectId: 'manager-9b08d',
            storageBucket: 'manager-9b08d.appspot.com',
            messagingSenderId: '327743773936'
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={createStore(reducers)} >
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
