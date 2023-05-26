import Input from '@components/Input/Input';
import { useAuth } from '@context/AuthContext';
import { useHeaderBackVisibility } from '@hooks/useHeaderBackVisibility';
import { usePreventGoBackHandler } from '@hooks/usePreventGoBack';
import { useRules } from '@hooks/useRules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetPassword } from '@services/authService';
import { STORAGE_KEYS, readStorageKey } from '@services/storageService';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Title } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>;

const INPUTS = {
    passwordRepeat: 'passwordRepeat',
    password: 'password',
} as const;

type ResetPasswordData = {
    password: string;
    passwordRepeat: string;
};

export function ResetPasswordScreen() {
    const methods = useForm<ResetPasswordData>();
    const { t } = useTranslation();
    const { required, validate } = useRules();
    const { navigate } = useNavigation<NavigationProp>();
    const { login } = useAuth();
    const { mutateAsync, isLoading } = useMutation(resetPassword);

    useHeaderBackVisibility(isLoading, false);
    usePreventGoBackHandler(isLoading);

    const { control, handleSubmit } = methods;

    const onResetPassword = handleSubmit(async data => {
        const { password } = data;
        const email = await readStorageKey(STORAGE_KEYS.Email);
        if (!email) return navigate('Signin'); // TODO: add error toast
        const token = await mutateAsync({ email, password: String(password) });
        if (token) login(token.access_token);
    });

    return (
        <FormProvider {...methods}>
            <ScrollView>
                <View style={styles.root}>
                    <Title>{t('resetPasswordHeadline')}</Title>
                    <Input
                        autoComplete={'password-new'}
                        control={control}
                        icon="account"
                        label={INPUTS.password}
                        placeholder={INPUTS.password}
                        rules={{ required }}
                        secureTextEntry
                    />
                    <Input
                        autoComplete={'off'}
                        control={control}
                        icon="lock"
                        label={INPUTS.passwordRepeat}
                        placeholder={INPUTS.passwordRepeat}
                        rules={{ required, validate: validate.passwordRepeat(methods) }}
                        secureTextEntry
                    />

                    <View style={styles.buttons}>
                        <Button disabled={isLoading} loading={isLoading} mode="contained" onPress={onResetPassword}>
                            {t('resetPassword')}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
    },
    buttons: {
        gap: 10,
    },
});
