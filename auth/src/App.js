import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({        //array dari 'web setup' di firebase
            apiKey: 'AIzaSyDZkKaUmVPT2tYS-5A5pMX-DA2dsGbFz3M',
            authDomain: 'auth-aa19e.firebaseapp.com',
            databaseURL: 'https://auth-aa19e.firebaseio.com',
            projectId: 'auth-aa19e',
            storageBucket: 'auth-aa19e.appspot.com',
            messagingSenderId: '714815779184'
        });
    }

    render(){
        return (
            <View>
                <Header headerTitle={'Authentication'} />
            </View>
            
        );
    }
}

export default App;