import { User } from "src/app/core/shared/interfaces/user"

export interface LoginResponse {
    user: User,
    authorization: Authorization
}

interface Authorization {
    token: string,
    type: string
}
