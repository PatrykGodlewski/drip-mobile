import Config from 'react-native-config';
import { STORAGE_KEYS, readStorageKey } from './storageService';

export enum METHODS {
    'Post' = 'POST',
    'Get' = 'GET',
    'Put' = 'PUT',
    'Delete' = 'DELETE',
}

export enum ROUTES {
    'Signup' = '/auth/signup',
    'Signin' = '/auth/signin',
    'ResetPassword' = '/auth/reset-password',
    'VerifyCode' = '/auth/verify-code',
    'SendVeryficationCode' = '/auth/send-veryfication-code',
    'Me' = '/users/me',
}

const DEFAULT_HEADERS = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
});

export async function fetchClient(route: ROUTES, method?: METHODS, body?: string, headers: Headers = DEFAULT_HEADERS) {
    const baseUrl = Config.API_URL;
    if (!baseUrl) throw new Error('API_URL not found');

    const url = new URL(route, baseUrl);

    const token = await readStorageKey(STORAGE_KEYS.Token);

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const res = await fetch(url.href, {
        method,
        body,
        headers,
    });
    if (res.status === 204) return { message: 'No Content' };
    if (!res.ok) throw Error(await res.text());
    return res.json();
}
