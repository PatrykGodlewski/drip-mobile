import SettingsSection from '@components/SettingsSection/SettingsSection';
import { Languages, languages } from '@translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, List } from 'react-native-paper';

const SettingsScreen = () => {
    const { t, i18n } = useTranslation();
    function onPress(lang: Languages) {
        i18n.changeLanguage(lang);
    }
    return (
        <>
            <SettingsSection>
                <List.Section>
                    <List.Subheader key={'header'}>{t('languages')}</List.Subheader>
                    {languages.map((language, index) => (
                        <React.Fragment key={`frag_${index}`}>
                            <List.Item
                                description={t(`lang.${language}`)}
                                key={`listItem_${index}`}
                                right={props =>
                                    i18n.language === language && (
                                        <List.Icon {...props} icon={'checkbox-marked-circle-outline'} />
                                    )
                                }
                                title={t(`lang.${language}`, { lng: language })}
                                onPress={() => onPress(language)}
                            />
                            <Divider key={`divider_${index}`} />
                        </React.Fragment>
                    ))}
                </List.Section>
            </SettingsSection>
        </>
    );
};

export default SettingsScreen;
