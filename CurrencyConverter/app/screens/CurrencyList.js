import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';

import { ListItem } from '../components/List';
import currencies from '../data/currencies';
import Separator from '../components/List/Separator';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    handlePress = () => {
        console.log('row press');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="default" translucent={false} />
                <FlatList 
                    data={currencies}
                    renderItem={({ item }) => (
                        <ListItem  
                            text={item}
                            selected={item === TEMP_CURRENT_CURRENCY}
                            onPress={this.handlePress}
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

export default CurrencyList;
