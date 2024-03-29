import { User } from '../models/user';

async function fetchData(input:RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData('/api/auth', { method: 'GET' });
    return response.json();
}

export interface SignUpCredentials{
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User>{
    const response = await fetchData('/api/auth/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LoginCredentials{
    email: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User>{
    const response = await fetchData('/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logout() {
    await fetchData('/api/auth/logout', { method: "POST" });
}

