import {
    STORAGE_KEYS,
    deleteStorageKey,
    readStorageKey,
    writeStorageKey,
} from '@services/storageService/storageService';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ContextType = ReturnType<typeof _useAuth>;
type Token = string | undefined;

const AuthContext = createContext<ContextType>({
    isLoggedin: false,
    isLoading: false,
    login: async () => {},
    logout: async () => {},
});

export const useAuthQuery = () => {
    // const queryClient = useQueryClient();

    return;
};

export const useAuth = () => useContext(AuthContext);

function _useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<Token>(undefined);

    const isLoggedin = Boolean(token);

    async function logout() {
        try {
            setIsLoading(true);
            await deleteStorageKey(STORAGE_KEYS.Token);
            setToken(undefined);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function login(t: NonNullable<Token>) {
        try {
            setIsLoading(true);
            await writeStorageKey(STORAGE_KEYS.Token, t);
            setToken(t);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                if (token) return;
                const storedToken = await readStorageKey(STORAGE_KEYS.Token);
                if (!storedToken) return;
                if (storedToken && typeof storedToken !== 'string') throw new Error('Invalid token');
                setToken(storedToken);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isLoggedin, isLoading, logout, login };
}

interface ProviderProps extends React.PropsWithChildren<{}> {}

export const Provider = ({ children }: ProviderProps) => {
    const { isLoggedin, isLoading, logout, login } = _useAuth();

    return <AuthContext.Provider value={{ isLoggedin, isLoading, login, logout }}>{children}</AuthContext.Provider>;
};
