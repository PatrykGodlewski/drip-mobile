import { METHODS, ROUTES, fetchClient } from '../client';

type User = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    username: string | null;
};

export async function getMe() {
    const userInfo: { user: User } = await fetchClient(ROUTES.Me, METHODS.Get);
    return userInfo;
}
