import axiosClient from "./axiosClient";
import axios from "axios";

class AppAPI {
    MYAPI: string;
    constructor(api: string | undefined) {
        this.MYAPI = api ? api : "http://localhost:3333/api";
    }
    // Authen
    login = (data: any) => {
        const url = this.MYAPI.concat("/auth/login");
        return axios.post(url, data, {
            withCredentials: true,
        });
    }
    
    getNewToken =  () => {
        const url = this.MYAPI.concat("/auth/token");
        return axios.get(url, {
            withCredentials: true,
        });
    }

    addNFT = (data: any) => {
        const url = this.MYAPI.concat("/nft/add");
        return axiosClient.post(url, data);
    }

    getMyNFT = () => {
        const url = this.MYAPI.concat("/nft/my");
        return axiosClient.get(url);
    }

    createLoan = (data : any) => {
        const url = this.MYAPI.concat("/loan/create");
        return axiosClient.post(url, data);
    }

    getAllLoan = () => {
        const url = this.MYAPI.concat("/loan/all");
        return axios.get(url);
    }

    getLoan = (id: string) => {
        const url = this.MYAPI.concat(`/loan/${id}`);
        return axiosClient.get(url);
    }

    acceptLoan = (data:any) => {
        const url = this.MYAPI.concat(`/loan/start`);
        return axiosClient.post(url, data);
    }

    getMyLend = () => {
        const url = this.MYAPI.concat("/loan/myLend");
        return axiosClient.get(url);
    }

    getMyBorrow = () => {
        const url = this.MYAPI.concat("/loan/myBorrow");
        return axiosClient.get(url);
    }
}

const appApi = new AppAPI(process.env.REACT_APP_API_CORE_ENDPOINT);

export default appApi;