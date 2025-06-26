export interface Login {
    username: string,
    password: string,
}

export interface Signup extends Login{
    email: string,
    roleSet: Array<string>
}