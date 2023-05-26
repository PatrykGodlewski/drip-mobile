import React from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

const LanguageSwitch = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(prevSwitchState => !prevSwitchState);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>PL</Text>
            <Switch onValueChange={onToggleSwitch} value={isSwitchOn} />
            <Text>ENG</Text>
        </View>
    );
};

export default LanguageSwitch;
