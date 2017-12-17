import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }
    componentWillMount() {
        firebase.initializeApp({        //array dari 'web setup' di firebase
            apiKey: 'AIzaSyDZkKaUmVPT2tYS-5A5pMX-DA2dsGbFz3M',
            authDomain: 'auth-aa19e.firebaseapp.com',
            databaseURL: 'https://auth-aa19e.firebaseio.com',
            projectId: 'auth-aa19e',
            storageBucket: 'auth-aa19e.appspot.com',
            messagingSenderId: '714815779184'
        });

        firebase.auth().onAuthStateChanged((user) => {  //function triggered kalo status auth berubah
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    //harusnya <Button>LOGOUT</Button> doang, tapi karna flex: 1 bikin error, jadi ada cardsection
                    <CardSection>
                        <Button btnOnPress={() => firebase.auth().signOut()} >Log Out</Button>
                    </CardSection>
                    //mekanisme sign out
                ); 
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }   
    }

    render() {
        return (
            <View>
                <Header headerTitle={'Authentication'} />
                {this.renderContent()}
            </View>            
        );
    }
}

export default App;
