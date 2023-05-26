import { useHeaderBackVisibility } from '@hooks/useHeaderBackVisibility';
import { usePreventGoBackHandler } from '@hooks/usePreventGoBack';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { verifyCode } from '@services/authService';
import { STORAGE_KEYS, deleteStorageKey, readStorageKey } from '@services/storageService';
import { useMutation } from '@tanstack/react-query';
import { RootStackParamList } from 'App';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, SafeAreaView, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    RenderCellOptions,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from 'react-native-paper';
import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    DEFAULT_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signin'>;

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = {
    uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: { hasValue: boolean; index: number; isFocused: boolean }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

export function VerifyCodeScreen() {
    const { t } = useTranslation();
    const { navigate } = useNavigation<NavigationProp>();

    usePreventGoBackHandler(true);
    useHeaderBackVisibility(false, false);

    function onCancel() {
        navigate('Signin');
        deleteStorageKey(STORAGE_KEYS.Email);
    }

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    usePreventGoBackHandler(true, {
        onPreventedGoBack: () => navigate('Signin'),
    });

    const { isLoading, mutateAsync } = useMutation(verifyCode, {
        onSuccess: () => navigate('ResetPassword'),
    });

    async function onVerify() {
        const email = await readStorageKey(STORAGE_KEYS.Email);
        const code = Number(value);
        if (isNaN(code)) return; // add toast error message
        if (!email) return navigate('Signin'); // TODO: add error message
        await mutateAsync({ code, email });
    }

    const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                  })
                : animationsColor[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                  }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText key={index} style={[styles.cell, animatedCellStyle]} onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Verification</Text>
            <Image source={source} style={styles.icon} />
            <Text style={styles.subTitle}>
                Please enter the verification code{'\n'}
                we send to your email address
            </Text>

            <CodeField
                RootProps={{ 'aria-disabled': isLoading }}
                ref={ref}
                {...props}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                renderCell={renderCell}
                rootStyle={styles.codeFieldRoot}
                textContentType="oneTimeCode"
                value={value}
                onChangeText={setValue}
            />
            <View style={styles.buttonContainer}>
                <Button disabled={isLoading} mode="contained" onPress={onVerify}>
                    {t('verify')}
                </Button>
                <Button disabled={isLoading} mode="outlined" onPress={onCancel}>
                    {t('cancel')}
                </Button>
            </View>
        </SafeAreaView>
    );
}
