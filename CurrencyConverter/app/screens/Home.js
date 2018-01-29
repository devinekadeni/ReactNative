import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';

class Home extends Component {
    handlerPressBaseCurrency = () => {
        console.log('press base');
    }

    handlerPressQuoteCurrency = () => {
        console.log('press quote');
    }

    handleTextChange = (text) => {
        console.log('change text', text);
    }

    render() {
        return (
            <Container>
                <StatusBar
                    translucent={false} //android
                    barStyle="light-content"
                />
                <Logo />
                <InputWithButton 
                    buttonText={TEMP_BASE_CURRENCY}
                    onPress={this.handlerPressBaseCurrency}
                    defaultValue={TEMP_BASE_PRICE}
                    keyboardType="numeric"
                    onChangeText={this.handleTextChange}
                />
                <InputWithButton 
                    buttonText={TEMP_QUOTE_CURRENCY}
                    onPress={this.handlerPressQuoteCurrency}
                    editable={false}
                    value={TEMP_QUOTE_PRICE}
                />
            </Container>
        );
    }
}

export default Home;
