import { useState } from "react";

export default useApi = (apiFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const request = async (...args) => {
        setLoading(true)
        const response = await apiFunction(...args);
        setLoading(false)

        if(!response.ok){
            console.log("there is a porblem with calling the Server " + response.problem)
            return
        }
        setData(response.data)
        setSuccess(true)
    }

    return { data , loading, request, success }
}