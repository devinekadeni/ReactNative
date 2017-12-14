import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ btnOnPress, children }) => (
        <TouchableOpacity onPress={btnOnPress} style={style.buttonStyle} >
            <Text>{children}</Text>
        </TouchableOpacity> 
    ); 

const style = {
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3f3f3'
    }
};

export { Button };
