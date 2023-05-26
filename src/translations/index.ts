import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './resources';

export type Languages = keyof typeof resources;
export const languages = Object.keys(resources) as Languages[];

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    returnNull: false,
    resources: {
        ...Object.entries(resources).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: {
                    translation: value,
                },
            }),
            {},
        ),
    },
    lng: 'pl',
});

export default i18n;
