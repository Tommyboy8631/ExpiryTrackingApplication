import { apiClient } from "./client"

const removeItem = (id) => apiClient.get("/removeItem/" + id)

export default {
    removeItem,
}