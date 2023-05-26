import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// TODO: use android back handler

export function usePreventGoBack(condition: boolean, message?: string) {
    const navigation = useNavigation();
    useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                if (!condition) return;
                e.preventDefault();
                console.info(message);
            }),
        [navigation, condition, message],
    );
}

type UsePreventGoBackHandlerOptions = {
    onGoBack?: () => void;
    onPreventedGoBack?: () => void;
};

export function usePreventGoBackHandler(isPrevented: boolean, options?: UsePreventGoBackHandlerOptions) {
    const navigation = useNavigation();

    useEffect(() => {
        function runOptionHandler(handleName: keyof UsePreventGoBackHandlerOptions) {
            if (!options) return;
            if (handleName in options) {
                const handler = options[handleName];
                if (typeof handler === 'function') handler();
            }
        }

        function preventGoBack() {
            if (!isPrevented) {
                navigation.goBack();
                runOptionHandler('onGoBack');
                return true;
            }
            runOptionHandler('onPreventedGoBack');
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', preventGoBack);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', preventGoBack);
        };
    }, [isPrevented, navigation, options]);
}
