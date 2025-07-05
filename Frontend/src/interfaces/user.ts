export interface User {
    id: number,
    username: string,
}

export interface SetUser {
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
}

export interface DataUser {
    username: string,
    email?: string,
    password: string,
    confirmPassword?: string
}

export interface UserDataLocalStorage {
    username: string,
    message: string,
    jwt: string,
}