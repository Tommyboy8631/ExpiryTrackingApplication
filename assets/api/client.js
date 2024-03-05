import { create } from "apisauce"
import cache from "../../utility/cache"


export const apiClient = create({
    baseURL: "http://192.168.1.107:80"
})


export default apiClient
