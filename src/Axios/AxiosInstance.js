import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:"https://youtube-clone-server.up.railway.app/api/v1",
    withCredentials: true
})

export { AxiosInstance }