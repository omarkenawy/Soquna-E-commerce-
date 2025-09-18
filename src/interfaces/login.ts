export interface LoginSucces {
    message: string
    user: UserResponse
    token: string
}

export interface LoginFailed {
    statusMsg: string
    message: string
}

export interface UserResponse {
    name: string
    email: string
    role: string
}
