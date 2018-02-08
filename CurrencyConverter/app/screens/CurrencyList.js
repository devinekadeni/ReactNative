import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View, StatusBar } from 'react-native';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        primaryColor: PropTypes.string,
    };
    handlePress = (currency) => {
        const { type } = this.props.navigation.state.params;
        if (type === 'base') {
            this.props.dispatch(changeBaseCurrency(currency));
        } else if (type === 'quote') {
            this.props.dispatch(changeQuoteCurrency(currency));
        }
        // console.log('row press');
        this.props.navigation.goBack(null);
    };

    render() {
        let comparisonCurrency = this.props.baseCurrency;
        const { type } = this.props.navigation.state.params;
        if (type === 'quote') {
            comparisonCurrency = this.props.quoteCurrency;    
        }

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="default" translucent={false} />
                <FlatList 
                    data={currencies}
                    renderItem={({ item }) => (
                        <ListItem  
                            text={item}
                            selected={item === comparisonCurrency}
                            onPress={() => this.handlePress(item)}
                            iconBackground={this.props.primaryColor}
                            // checkmark={false}
                            // visible={false}
                        />
                    )}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
        primaryColor: state.theme.primaryColor,
    };
};

export default connect(mapStateToProps)(CurrencyList);

