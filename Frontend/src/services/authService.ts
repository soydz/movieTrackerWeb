import type { Login, Signup } from "../interfaces/auth"

const URL_LOGIN = `${import.meta.env.VITE_API_URL}/auth/log-in`
const URL_SIGNUP = `${import.meta.env.VITE_API_URL}/auth/sign-up`

export const login = async (login: Login) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    }

    return await fetch(URL_LOGIN, options)
}

export const signup = async (signup: Signup) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signup)
    }

    return await fetch(URL_SIGNUP, options)
}


const authService = {
    login,
    signup
}

export default authService;