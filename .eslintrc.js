module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'eslint:recommended',
        'eslint-config-prettier',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    plugins: ['prettier', 'react'],
    rules: {
        'prettier/prettier': 'off',
        'react/jsx-sort-props': [
            'error',
            {
                callbacksLast: true,
            },
        ],
        'react/no-unstable-nested-components': 'off',
    },
};
