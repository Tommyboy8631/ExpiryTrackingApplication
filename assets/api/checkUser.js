import { apiClient } from "./client"

const getUser = (id) => apiClient.get("/users/" + id)

export default {
    getUser,
}