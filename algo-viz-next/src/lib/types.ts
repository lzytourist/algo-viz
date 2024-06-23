export interface NewUser {
    first_name: string,
    last_name: string,
    email: string,
    date_of_birth?: string,
    gender?: string,
    institute?: string,
    password: string,
    re_password: string
}

export interface User {
    first_name: string,
    last_name: string,
    email: string,
    date_of_birth?: string,
    gender: string,
    institute?: string
}

export interface Errors {
    [key: string]: string[]
}
