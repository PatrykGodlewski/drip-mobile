import Input from '@components/Input/Input';
import SocialButtons from '@components/SocialButtons/SocialButtons';
import Title from '@components/Title/Title';
import { useHeaderBackVisibility } from '@hooks/useHeaderBackVisibility';
import { usePreventGoBackHandler } from '@hooks/usePreventGoBack';
import { useRules } from '@hooks/useRules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signup } from '@services/authService/';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const INPUTS = {
    username: 'username',
    email: 'email',
    password: 'password',
    passwordRepeat: 'passwordRepeat',
} as const;
type InputNames = (typeof INPUTS)[keyof typeof INPUTS];
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
type SignupData = Record<InputNames, string>;

const SignupScreen = () => {
    const methods = useForm<SignupData>();
    const { t } = useTranslation();
    const { required, pattern, validate } = useRules();
    const { navigate } = useNavigation<NavigationProp>();
    const { isLoading, mutate } = useMutation(signup, {
        onSuccess: () => {
            // TODO: add toast successful created user
            navigate('Signin');
        },
    });

    useHeaderBackVisibility(isLoading);
    usePreventGoBackHandler(isLoading);

    const { control, handleSubmit } = methods;

    const onRegister = handleSubmit(async formData => {
        const { username, email, password } = formData;
        mutate({ username, email, password });
    });

    function onNavigateToSignin() {
        navigate('Signin');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Title>{t('createAccountHeadline')}</Title>
                <Input
                    autoComplete={'username-new'}
                    control={control}
                    icon="account"
                    label={INPUTS.username}
                    placeholder={INPUTS.username}
                    rules={{ required }}
                />
                <Input
                    autoComplete={INPUTS.email}
                    control={control}
                    icon={INPUTS.email}
                    label={INPUTS.email}
                    placeholder={INPUTS.email}
                    rules={{
                        required,
                        pattern: pattern.email,
                    }}
                />
                <Input
                    autoComplete="password-new"
                    control={control}
                    icon="lock"
                    label={INPUTS.password}
                    placeholder={INPUTS.password}
                    rules={{ required }}
                    secureTextEntry
                />
                <Input
                    autoComplete="off"
                    control={control}
                    icon="lock"
                    label={INPUTS.passwordRepeat}
                    placeholder={INPUTS.passwordRepeat}
                    rules={{ required, validate: validate.passwordRepeat(methods) }}
                    secureTextEntry
                />
                <View style={styles.buttons}>
                    <Button disabled={isLoading} loading={isLoading} mode="contained" onPress={onRegister}>
                        {t('register')}
                    </Button>
                    <Text variant="bodyMedium">
                        By registering, you confirm that you accept our Term of Use and Privacy Policy{' '}
                    </Text>
                    <SocialButtons disabled={isLoading} />
                    <Button disabled={isLoading} onPress={onNavigateToSignin}>
                        {t('haveAnAccount')}
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    buttons: {
        gap: 20,
    },
});

export default SignupScreen;
