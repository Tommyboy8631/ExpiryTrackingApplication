import { apiClient } from "./client"

const updateToken = (ID, Token) => apiClient.post("/updateToken", {
    id: ID,
    token: Token,
})

export default {
    updateToken,
}