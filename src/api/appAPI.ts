import axiosClient from "./axiosClient";
import axios from "axios";

class AppAPI {
    LOYALCHAIN_API: string;
    constructor(api: string | undefined) {
        this.LOYALCHAIN_API = api ? api : "http://localhost:3333/api";
    }
    // Authen
    login = (data: any) => {
        const url = this.LOYALCHAIN_API.concat("/auth/login");
        return axios.post(url, data, {
            withCredentials: true,
        });
    }
    
    getNewToken =  () => {
        const url = this.LOYALCHAIN_API.concat("/auth/token");
        return axios.get(url, {
            withCredentials: true,
        });
    }
}

const appApi = new AppAPI(process.env.REACT_APP_API_CORE_ENDPOINT);

export default appApi;