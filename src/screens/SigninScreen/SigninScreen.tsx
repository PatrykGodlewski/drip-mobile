import Input from '@components/Input/Input';
import Logo from '@components/Logo/Logo';
import SocialButtons from '@components/SocialButtons/SocialButtons';
import { useAuth } from '@context/AuthContext';
import { useHeaderBackVisibility } from '@hooks/useHeaderBackVisibility';
import { usePreventGoBack } from '@hooks/usePreventGoBack';
import { useRules } from '@hooks/useRules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signin } from '@services/authService/authService';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>;

const INPUTS = {
    email: 'email',
    password: 'password',
} as const;

type SigninData = {
    email: string;
    password: string;
};

const SigninScreen = () => {
    const methods = useForm<SigninData>();
    const { t } = useTranslation();
    const { required, pattern } = useRules();
    const { navigate } = useNavigation<NavigationProp>();
    const { login } = useAuth();
    const { mutateAsync, isLoading } = useMutation(signin);

    useHeaderBackVisibility(isLoading);
    usePreventGoBack(isLoading);

    const { control, handleSubmit } = methods;

    const onSignin = handleSubmit(async data => {
        const token = await mutateAsync(data);
        if (token) login(token.access_token);
    });
    function onForgotPassword() {
        navigate('ForgotPassword');
    }
    function onCreateAccount() {
        navigate('Signup');
    }

    return (
        <FormProvider {...methods}>
            <ScrollView>
                <View style={styles.root}>
                    <Logo />
                    <Input
                        autoComplete={INPUTS.email}
                        control={control}
                        icon="account"
                        label={INPUTS.email}
                        placeholder={INPUTS.email}
                        rules={{ required, pattern: pattern.email }}
                    />
                    <Input
                        autoComplete={INPUTS.password}
                        control={control}
                        icon="lock"
                        label={INPUTS.password}
                        placeholder={INPUTS.password}
                        rules={{ required }}
                        secureTextEntry
                    />

                    <View style={styles.buttons}>
                        <Button disabled={isLoading} loading={isLoading} mode="contained" onPress={onSignin}>
                            {t('signin')}
                        </Button>
                        <Button disabled={isLoading} onPress={onForgotPassword}>
                            {t('forgotPassword')}
                        </Button>
                        <SocialButtons disabled={isLoading} />
                        <Button disabled={isLoading} onPress={onCreateAccount}>
                            {t('dontHaveAccount')}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </FormProvider>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    buttons: {
        gap: 10,
    },
});

export default SigninScreen;
