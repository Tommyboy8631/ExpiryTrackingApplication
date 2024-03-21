import { apiClient } from "./client"

const getToken = (id) => apiClient.get("/getToken/" + id)

export default {
    getToken,
}