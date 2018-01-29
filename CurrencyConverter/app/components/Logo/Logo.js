import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

const Logo = () => (
    <View style={styles.container}>
        <View style={styles.containerImage}>
            <View style={styles.background}>
                <Image resizeMode="contain" style={styles.imageStyle} source={require('./images/background.png')} />
            </View>
            <View>
                <Image resizeMode="contain" style={styles.image} source={require('./images/logo.png')} />
            </View>
        </View>
        <Text style={styles.iconTitle}>Currency Converter</Text>
    </View>
);

export default Logo;
