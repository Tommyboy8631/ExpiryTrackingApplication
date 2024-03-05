import { apiClient } from "./client"

const createItem = (Belonging, Name, Subtitle, Expiry) => apiClient.post("/addItem", {
    belonging: Belonging,
    name: Name,
    subtitle: Subtitle,
    expiry: Expiry
})

export default {
    createItem,
}