import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export function useHeaderBackVisibility(isBackButtonInvisible: boolean, isHeaderVisible = true) {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
    useEffect(() => {
        navigation.setOptions({ headerBackVisible: !isBackButtonInvisible, headerShown: isHeaderVisible });
        return () => {
            navigation.setOptions({ headerBackVisible: true, headerShown: true });
        };
    }, [navigation, isBackButtonInvisible, isHeaderVisible]);
}
