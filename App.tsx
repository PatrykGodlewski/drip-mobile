import SettingsButton from '@components/SettingsButton/SettingsButton';
import { Provider, useAuth } from '@context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmSignupScreen from '@screens/ConfirmSignupScreen/ConfirmSignupScreen';
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen/ForgotPasswordScreen';
import HomeScreen from '@screens/HomeScreen';
import { ResetPasswordScreen } from '@screens/ResetPasswordScreen';
import SettingsScreen from '@screens/SettingsScreen/SettingsScreen';
import SigninScreen from '@screens/SigninScreen/SigninScreen';
import SignupScreen from '@screens/SignupScreen/SignupScreen';
import { VerifyCodeScreen } from '@screens/VerifyCodeScreen/VerifyCodeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { navigatorTheme, theme } from '@theme/theme';
import '@translations';
import React, { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export type RootStackParamList = {
    Signin: undefined;
    Signup: undefined;
    ConfirmSignup: undefined;
    ForgotPassword: undefined;
    Settings: undefined;
    Home: undefined;
    ResetPasswordCode: undefined;
    ResetPassword: undefined;
};

export type Routes = keyof RootStackParamList;

function Navigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { t } = useTranslation();
    const { isLoggedin } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerRight: () => <SettingsButton /> }}>
            {isLoggedin ? (
                <>
                    <Stack.Screen component={HomeScreen} name="Home" options={{ title: t('home') }} />
                </>
            ) : (
                <>
                    <Stack.Screen component={SigninScreen} name="Signin" options={{ title: t('screenSignin') }} />
                    <Stack.Screen component={SignupScreen} name="Signup" options={{ title: t('screenSignup') }} />
                    <Stack.Screen
                        component={ConfirmSignupScreen}
                        name="ConfirmSignup"
                        options={{ title: t('confirmSignup') }}
                        // TODO: create logic for it
                    />
                    <Stack.Screen
                        component={ForgotPasswordScreen}
                        name="ForgotPassword"
                        options={{ title: t('screenForgotPassword') }}
                    />
                    <Stack.Screen component={VerifyCodeScreen} name="ResetPasswordCode" />
                    <Stack.Screen component={ResetPasswordScreen} name="ResetPassword" />
                </>
            )}
            <Stack.Screen component={SettingsScreen} name="Settings" options={{ title: t('settings') }} />
        </Stack.Navigator>
    );
}

export default function App(): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer theme={navigatorTheme}>
                <PaperProvider theme={theme}>
                    <Provider>
                        <SafeAreaView style={styles.root}>
                            <Navigator />
                        </SafeAreaView>
                    </Provider>
                </PaperProvider>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    navigationRoot: {
        backgroundColor: 'white',
    },
});
