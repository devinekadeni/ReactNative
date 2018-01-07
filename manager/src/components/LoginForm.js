import React, { Component } from 'react';
import { Card, CardSection, Button, Input } from './common';

class LoginForm extends Component {
    onEmailChange(text) {
        
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeHolderVar="email@gmail.com"
                        onChangeTextVar={this.onEmailChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        label="Password"
                        placeHolderVar="password"
                    />
                </CardSection>
                <CardSection>
                    <Button>
                        Login
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;
