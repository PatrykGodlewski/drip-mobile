import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme, useTheme as _useTheme } from 'react-native-paper';

export const navigatorTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        background: '#fff',
    },
};

export const theme = {
    ...DefaultTheme,
    button: {
        facebook: {
            backgroundColor: '#E7EAF4',
            foregroundColor: '#4765A9',
        },
        google: {
            backgroundColor: '#FAE9EA',
            foregroundColor: '#DD4D44',
        },
        apple: {
            backgroundColor: '#e3e3e3',
            foregroundColor: '#363636',
        },
    },
};

type Theme = typeof theme;

export const useTheme = () => {
    return _useTheme<Theme>();
};
