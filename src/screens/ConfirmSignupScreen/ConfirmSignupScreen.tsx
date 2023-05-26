import Input from '@components/Input/Input';
import Title from '@components/Title/Title';
import { useRules } from '@hooks/useRules';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import React from 'react';
import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
    const methods = useForm();
    const { t } = useTranslation();
    const { required } = useRules();
    const { navigate } = useNavigation<NavigationProp>();

    const { control, handleSubmit } = methods;

    function onSubmit(data: FieldValues) {
        console.log(data);
    }
    function onBackToSignin() {
        navigate('Signin');
    }

    return (
        <FormProvider {...methods}>
            <ScrollView>
                <View style={styles.root}>
                    <Title>{t('createAccountHeadline')}</Title>
                    <Input
                        autoComplete="email"
                        control={control}
                        icon="email"
                        label="email"
                        placeholder="email"
                        rules={{ required }}
                    />

                    <View style={styles.buttons}>
                        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
                            {t('signin')}
                        </Button>
                        <Button onPress={onBackToSignin}>{t('backToSignin')}</Button>
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
});

export default ForgotPasswordScreen;
