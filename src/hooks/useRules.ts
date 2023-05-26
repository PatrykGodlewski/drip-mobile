import { EMAIL_REGEXP } from '@helpers/constants';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const useRules = () => {
    const { t } = useTranslation();
    return {
        required: {
            value: true,
            message: t('required'),
        },
        pattern: {
            email: { value: EMAIL_REGEXP, message: t('invalidEmail') },
        },
        validate: {
            passwordRepeat: (methods: UseFormReturn<any, any>) => (value: string) =>
                value === methods.getValues().password,
        },
    };
};
