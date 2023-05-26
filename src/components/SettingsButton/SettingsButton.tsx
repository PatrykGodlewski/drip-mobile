import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type UseRouteProp = RouteProp<RootStackParamList>;

const SettingsButton = () => {
    const { navigate } = useNavigation<NavigationProp>();
    const route = useRoute<UseRouteProp>();
    function onPress() {
        navigate('Settings');
    }
    return (
        <>
            {route.name !== 'Settings' && (
                <TouchableOpacity style={styles.root} onPress={onPress}>
                    <Icon name="cog" size={24} />
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
});

export default SettingsButton;
