import { useAuth } from '@context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getMe } from '@services/userService';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const navigate = useNavigation<NavigationProp>();
    const { data, isFetching } = useQuery(['getMe'], getMe);
    const { logout } = useAuth();
    function onPress() {
        logout();
    }

    return (
        <View>
            <Text style={styles.root}>HomeScreen</Text>
            {isFetching ? (
                <ActivityIndicator animating={isFetching} />
            ) : (
                <View>
                    <Text>Hello, {data?.user.username}!</Text>
                    <Text>Email: {data?.user.email}</Text>
                </View>
            )}
            <Button onPress={onPress}>logout</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
});
