import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    //state for feedback from user
    state = { email: '', password: '', errorMsg: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;  //ngambil data yg diinput user

        this.setState({ errorMsg: '', loading: true });  //mekanisme menghilangkan error message

        //urutan login
        /*user input -> kalo gagal -> sign up -> kalo gagal -> error message*/
        firebase.auth().signInWithEmailAndPassword(email, password)             //login
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {                                                      //gagal 1
                firebase.auth().createUserWithEmailAndPassword(email, password) //sign up
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));                      //gagal 2
                    // .catch(() => {                                              //gagal 2
                    //     this.setState({ errorMsg: 'Authentication Failed.' });  //error message
                    // });
            });
    }

    onLoginFail() {
        this.setState({ errorMsg: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({ loading: false, email: '', password: '', errorMsg: '' });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button btnOnPress={this.onButtonPress.bind(this)}>
            {/* bind supaya email-password bisa dibacadi dalem */}
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeHolderVar="user@gmail.com"
                        label="Email"
                        valueVar={this.state.email}
                        onChangeTextVar={email => this.setState({ email })}   //ES6
                        // onChangeTextVar={text => this.setState({ email: text })}  normal  
                    /> 
                    {/* textInput: user type->onChangeText triggered->setState->value()->user type (repeat)
                        value() = ngasi tau textInput kalo value dirinya adalah sesuai value() */}
                </CardSection>
                <CardSection>
                    <Input 
                        secureTextEntryVar
                        placeHolderVar="password"
                        label="Password"
                        valueVar={this.state.password}
                        onChangeTextVar={password => this.setState({ password })}   //ES6
                        // onChangeTextVar={text => this.setState({ password: text })}  normalce
                    />
                </CardSection>

                <Text style={style.errorMsgStyle} >
                    {this.state.errorMsg}
                </Text>

                <CardSection>
                    {/* <Button btnOnPress={this.onButtonPress.bind(this)}> */}
                    {/* bind supaya email-password bisa dibaca di dalem */}
                        {/* Login */}
                    {/* </Button> */}
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const style = {
    errorMsgStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center'
    }
};

export default LoginForm;
