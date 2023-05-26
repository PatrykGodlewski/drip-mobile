import logo from '@assets/images/logo.png';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
    return <Image resizeMode="contain" source={logo} style={styles.logo} />;
};
const styles = StyleSheet.create({
    logo: {
        width: '70%',
        maxWidth: 250,
        alignSelf: 'center',
        marginVertical: 30,
    },
});
export default Logo;
