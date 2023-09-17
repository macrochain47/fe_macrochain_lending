import axiosClient from "./axiosClient";
import axios from "axios";

class AppAPI {
    MYAPI: string;
    constructor(api: string | undefined) {
        this.MYAPI = api ? api : "http://localhost:3333/api";
    }

    // Authen
    Authen = {
        
    }
    
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


    // USER
    getMyLends = () => {
        const url = this.MYAPI.concat("/user/lends");
        return axiosClient.get(url);
    }

    getMyBorrows = () => {
        const url = this.MYAPI.concat("/user/borrows");
        return axiosClient.get(url);
    }

    getMyOffer = () => {
        const url = this.MYAPI.concat("/user/offers");
        return axiosClient.get(url);
    }

    // ASSET
    getMyAssets = () => {
        const url = this.MYAPI.concat("/asset/my");
        return axiosClient.get(url);
    }

    grantAsset = (data : {tokenID: string, uri: string, tokenName: string, user: string, image: string, valuation: number, signature: string}) => {
        const url = this.MYAPI.concat("/asset/grant");
        return axiosClient.post(url, data);
    }

    addAsset = (data : {tokenID: string, uri: string, tokenName: string, user:string, image: string, valuation: number}) => {
        const url = this.MYAPI.concat("/asset/add");
        return axiosClient.post(url, data);
    }

    mintAsset = (data: {assetID: string}) => {
        const url = this.MYAPI.concat("/asset/mint")
        return axiosClient.post(url, data);
    }

    // LOAN
    getAllLoans = () => {
        const url = this.MYAPI.concat("/loan/all");
        return axios.get(url);
    } 

    getLoan = (loanID : string) => {
        const url = this.MYAPI.concat("/loan/" + loanID);
        return axios.get(url);
    }

    getOfferOfLoan = (offerID: string) => {
        const url = this.MYAPI.concat("/loan/offers/" + offerID)
        return axios.get(url);
    }

    createNewLoan = (data: {
        collateralID: string, loanID: string, principal: number, principalType: string, 
        principalAddress: string, apr: number, duration: number, durationType: string, repayment: number;
    }) => {
        const url = this.MYAPI.concat("/create")
        return axiosClient.post(url, data);
    }

    startLend = (loanID: string) => {
        const url = this.MYAPI.concat("/loan/start-lend");
        return axiosClient.post(url, {id: loanID});
    }

    startBorrow = (data: {loanID: string, offerID: string}) => {
        const url = this.MYAPI.concat("/loan/start-borrow");
        return axiosClient.post(url, data);
    }

    makeOffer = ( data : {
        loanID: string, principal: number, principalType: string, 
        principalAddress: string, apr: number, duration: number, durationType: string, repayment: number;
    }) => {
        const url = this.MYAPI.concat("/loan/make-offer");
        return axiosClient.post(url, data);
    }

    repayLoan = (loanID: string) => {
        const url = this.MYAPI.concat("/loan/repay");
        return axiosClient.post(url, {id: loanID});
    }

    cancelLoan = (loanID : string) => {
        const url = this.MYAPI.concat("/loan/cancel");
        return axiosClient.post(url, {id: loanID});
    }

    withdrawOffer = (offerID: string) => {
        const url = this.MYAPI.concat("/loan/cancel-offer");
        return axiosClient.post(url, {id: offerID});
    }

    forfeiAsset = (loanID: string) => {
        const url = this.MYAPI.concat("loan/forfeit")
        return axiosClient.post(url, {id: loanID});
    }
}

const appApi = new AppAPI(process.env.REACT_APP_API_CORE_ENDPOINT);

export default appApi;