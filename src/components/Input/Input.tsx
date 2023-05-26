import React, { useState } from 'react';
import { Controller, FieldError, type Control, type FieldValues, type RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

type OmitInputValues = 'left' | 'mode' | 'onBlur' | 'onChange' | 'value';
interface InputProps extends Omit<React.ComponentProps<typeof TextInput>, OmitInputValues> {
    icon: IconSource;
    control: Control<FieldValues | any, any>;
    rules?: Omit<RegisterOptions<FieldValues, string>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
    shouldUnregister?: boolean;
}

const Input = ({
    icon,
    label,
    rules,
    defaultValue,
    control,
    shouldUnregister,
    key,
    placeholder,
    secureTextEntry,
    ...restProps
}: InputProps) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(secureTextEntry);

    function handleError(error: FieldError | undefined, invalid: boolean) {
        if (error?.ref?.name === 'passwordRepeat' && error.type === 'validate' && invalid)
            return t('passwordsDontMatch');
        return error?.message;
    }

    function getTogglerPassword() {
        if (!secureTextEntry) return null;
        return (
            <TextInput.Icon
                forceTextInputFocus={false}
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={() => setShowPassword(prev => !prev)}
            />
        );
    }

    return (
        <View>
            <Controller
                control={control}
                defaultValue={defaultValue}
                key={key}
                name={label as string}
                render={({ field: { onChange, onBlur, value, name }, fieldState: { error, invalid } }) => (
                    <>
                        <TextInput
                            error={Boolean(error)}
                            label={t(name)}
                            left={<TextInput.Icon icon={icon} />}
                            mode="outlined"
                            placeholder={placeholder ? t(placeholder) : undefined}
                            right={getTogglerPassword()}
                            secureTextEntry={showPassword}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            {...restProps}
                        />
                        <HelperText type="error" visible={Boolean(error)}>
                            {handleError(error, invalid)}
                        </HelperText>
                    </>
                )}
                rules={rules}
                shouldUnregister={shouldUnregister}
            />
        </View>
    );
};

export default Input;
