module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    },
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    '@components': './src/components',
                    '@context': './src/context',
                    '@services': './src/services',
                    '@hooks': './src/hooks',
                    '@screens': './src/screens',
                    '@helpers': './src/helpers',
                    '@theme': './src/theme',
                    '@translations': './src/translations',
                    '@assets': './src/assets',
                },
            },
        ],
    ],
};
