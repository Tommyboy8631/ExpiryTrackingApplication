import { apiClient } from "./client"

const checkUser = (Username, Password) => apiClient.post("/checkUser", {
    username: Username,
    password: Password
} )

export default {
    checkUser,
}