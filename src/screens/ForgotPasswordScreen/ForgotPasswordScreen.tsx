import Input from '@components/Input/Input';
import Title from '@components/Title/Title';
import { useHeaderBackVisibility } from '@hooks/useHeaderBackVisibility';
import { usePreventGoBackHandler } from '@hooks/usePreventGoBack';
import { useRules } from '@hooks/useRules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sendRequestForCode } from '@services/authService';
import { STORAGE_KEYS, deleteStorageKey, writeStorageKey } from '@services/storageService';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

type ForgotPasswordData = {
    email: string;
};

const ForgotPasswordScreen = () => {
    const methods = useForm<ForgotPasswordData>();
    const { navigate } = useNavigation<NavigationProp>();
    const { t } = useTranslation();
    const { required, pattern } = useRules();
    const { isLoading, mutateAsync } = useMutation(sendRequestForCode, {
        onSuccess: () => navigate('ResetPasswordCode'),
    });

    usePreventGoBackHandler(isLoading, {
        onGoBack: () => deleteStorageKey(STORAGE_KEYS.Email),
    });
    useHeaderBackVisibility(isLoading);

    const { control, handleSubmit } = methods;

    const onSubmit = handleSubmit(async formData => {
        await mutateAsync(formData);
        await writeStorageKey(STORAGE_KEYS.Email, formData.email);
    });

    function onBackToSignin() {
        navigate('Signin');
    }

    return (
        <FormProvider {...methods}>
            <ScrollView>
                <View style={styles.root}>
                    <Title>{t('forgotPasswordHeadline')}</Title>
                    <Input
                        autoComplete="email"
                        control={control}
                        icon="email"
                        label="email"
                        placeholder="email"
                        rules={{ required, pattern: pattern.email }}
                    />

                    <View style={styles.buttons}>
                        <Button disabled={isLoading} mode="contained" onPress={onSubmit}>
                            {t('sendResetPasswordCode')}
                        </Button>
                        <Button disabled={isLoading} onPress={onBackToSignin}>
                            {t('backToSignin')}
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
    logo: {
        width: '70%',
        maxWidth: 250,
        alignSelf: 'center',
    },
    buttons: {
        gap: 10,
    },
    headline: {
        marginBottom: 10,
    },
});

export default ForgotPasswordScreen;
