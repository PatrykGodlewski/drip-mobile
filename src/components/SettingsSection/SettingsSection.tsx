import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = React.ComponentProps<typeof View>;

const SettingsSection = ({ children }: Props) => {
    const theme = useTheme();
    return (
        <View style={styles.root}>
            {children}
            <View style={{ ...styles.divider, backgroundColor: theme.colors.backdrop }} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
    },
    divider: {
        height: 10,
    },
});

export default SettingsSection;
