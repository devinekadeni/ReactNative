import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connectAlert } from '../components/Alert';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';


class Home extends Component {
    static propTypes = {
        navigation: Proptypes.object,
        dispatch: Proptypes.func,
        baseCurrency: Proptypes.string,
        quoteCurrency: Proptypes.string,
        amount: Proptypes.number,
        conversionRate: Proptypes.number,
        isFetching: Proptypes.bool,
        lastConvertedDate: Proptypes.object,
        primaryColor: Proptypes.string,
        alertWithType: Proptypes.func,
        currencyError: Proptypes.string,
    };

    componentWillMount() {
        this.props.dispatch(getInitialConversion());
        // console.log('mounted');
    }

    componentWillReceiveProps(nextProps) {
        // console.log('masuk');
        if (nextProps.currencyError && !this.props.currencyError) {
            this.props.alertWithType('error', 'Error', nextProps.currencyError);
            // console.log('gagal');
        }
    }

    handlerPressBaseCurrency = () => {
        // console.log('press base');
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' }); 
    };

    handlerPressQuoteCurrency = () => {
        // console.log('press quote');
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' }); 
    };

    handleTextChange = (amount) => {
        // console.log('change text', text);
        // console.log(changeCurrencyAmount(amount));
        this.props.dispatch(changeCurrencyAmount(amount));
    };

    handleSwapCurrency = () => {
        // console.log('press swap currency');
        //this actually work with this.props.disptach();
        // console.log(swapCurrency());
        this.props.dispatch(swapCurrency());
    };

    handleOptionsPress = () => {
        // console.log('handle options press');
        this.props.navigation.navigate('Options');
    };

    render() {
        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if (this.props.isFetching) {
            quotePrice = '...';
        }

        return (
            <Container backgroundColor={this.props.primaryColor} >
                <StatusBar
                    translucent={false} //android
                    barStyle="light-content"
                />
                <Header 
                    onPress={this.handleOptionsPress}
                />
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor} />
                    <InputWithButton 
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlerPressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton 
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlerPressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConverted 
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        date={this.props.lastConversionDate}
                        conversionRate={this.props.conversionRate}
                    />
                    <ClearButton
                        text="Reverse Currencies"
                        onPress={this.handleSwapCurrency}
                    />
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapsStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};
    
    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? 
            new Date(conversionSelector.date) : new Date(),
        primaryColor: state.theme.primaryColor,
        currencyError: state.currencies.error,
    };
};

export default connect(mapsStateToProps)(connectAlert(Home));
