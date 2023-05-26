import AsyncStorage from '@react-native-async-storage/async-storage';

export enum STORAGE_KEYS {
    'Token' = 'token',
    'Lang' = 'lang',
    'Email' = 'email',
}

type StorageKeys = STORAGE_KEYS;

export async function writeStorageKey(key: StorageKeys, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
}
export async function readStorageKey(key: StorageKeys) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteStorageKey(key: StorageKeys) {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
}
