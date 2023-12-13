"use client"
import * as React from "react";
import Cookies from "universal-cookie";
import dayjs from "dayjs";


const cookies = new Cookies(null, { path: "/", sameSite: "strict" });

function reducer(state: any, action: string) {
    const { nome, cognome, userId } = state;
    return {
        nome,
        cognome,
        userId
    }
}

export const UserData = React.createContext({
    nome: cookies.get("nome"),
    cognome: cookies.get("cognome"),
    userId: cookies.get("user_id"),
});

const initialUserDataState = {
    nome: cookies.get("nome"),
    cognome: cookies.get("cognome"),
    userId: cookies.get("user_id"),
}

export function useUserData() {
    return React.useContext(UserData);
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialUserDataState);
    return (
        <UserData.Provider value={state}>
            {children}
        </UserData.Provider>
    );
}