import { apiClient } from "./client"

const getItems = (id) => apiClient.get("/items/" + id)

export default {
    getItems,
}

