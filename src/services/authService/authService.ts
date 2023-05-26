import { METHODS, ROUTES, fetchClient } from '../client';

interface SignupPayload {
    email: string;
    password: string;
    username: string | undefined;
}
interface SigninPayload {
    email: string;
    password: string;
}
interface ResetPasswordPayload {
    email: string;
    password: string;
}
interface SendResetPasswordPayload {
    email: string;
}
interface VerifyResetPasswordPayload {
    email: string;
    code: number;
}

export async function signup(payload: SignupPayload) {
    const token: { access_token: string } = await fetchClient(ROUTES.Signup, METHODS.Post, JSON.stringify(payload));
    return token;
}
export async function signin(payload: SigninPayload) {
    const token: { access_token: string } = await fetchClient(ROUTES.Signin, METHODS.Post, JSON.stringify(payload));
    return token;
}
export async function resetPassword(payload: ResetPasswordPayload) {
    const token: { access_token: string } = await fetchClient(
        ROUTES.ResetPassword,
        METHODS.Post,
        JSON.stringify(payload),
    );
    return token;
}
export async function sendRequestForCode(payload: SendResetPasswordPayload) {
    await fetchClient(ROUTES.SendVeryficationCode, METHODS.Post, JSON.stringify(payload));
}
export async function verifyCode(payload: VerifyResetPasswordPayload) {
    console.log(ROUTES.VerifyCode);
    const response: { message: 'Code is valid'; expiresAt: Date } = await fetchClient(
        ROUTES.VerifyCode,
        METHODS.Post,
        JSON.stringify(payload),
    );
    return response;
}
