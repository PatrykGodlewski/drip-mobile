import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '../../theme/theme';

interface SocialButtonsProps {
    disabled?: boolean;
}

const SocialButtons = ({ disabled }: SocialButtonsProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    function onGoogleSignin() {
        console.log('onGoogleSignin');
    }
    function onFacebookSignin() {
        console.log('onFacebookSignin');
    }
    function onAppleSignin() {
        console.log('onAppleSignin');
    }

    return (
        <View style={styles.root}>
            <Button
                buttonColor={theme.button.google.backgroundColor}
                disabled={disabled}
                mode="contained-tonal"
                textColor={theme.button.google.foregroundColor}
                onPress={onGoogleSignin}
            >
                {t('signInWith', { provider: 'Google' })}
            </Button>
            <Button
                buttonColor={theme.button.facebook.backgroundColor}
                disabled={disabled}
                mode="contained-tonal"
                textColor={theme.button.facebook.foregroundColor}
                onPress={onFacebookSignin}
            >
                {t('signInWith', { provider: 'Facebook' })}
            </Button>
            <Button
                buttonColor={theme.button.apple.backgroundColor}
                disabled={disabled}
                mode="contained-tonal"
                textColor={theme.button.apple.foregroundColor}
                onPress={onAppleSignin}
            >
                {t('signInWith', { provider: 'Apple' })}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        gap: 10,
    },
});

export default SocialButtons;
