import { createContext, ReactNode, useState } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try{
        destroyCookie(undefined, 'nextauth.token');
        Router.push('/')
    } catch  {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try{
            const response = await api.post('/session', {
                email,
                password
            });
            const { token, id, name } = response.data;
            setCookie(undefined, '@nextauth.token', token,{
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
            })

            setUser({
                id,
                name,
                email
            })
            //passar para as proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            //redirecionar o user para a pagina de dashboard
            Router.push('/dashboard')
        } catch(err)  {
            console.log("erro ao acessar", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}