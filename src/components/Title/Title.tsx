import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type Props = React.ComponentProps<typeof Text>;

const Title = ({ children, ...restProps }: Props) => {
    return (
        <Text style={styles.root} variant="headlineLarge" {...restProps}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    root: {
        marginBottom: 10,
    },
});

export default Title;
