import { NFTBaseData } from "@/contracts/NFTBase"

export const getNFTBaseContract = (web3 : any, address : string) => {
    return new web3.eth.Contract( NFTBaseData, address )
}

export const getLendingContract = (web3: any, address: string) => {
    return new web3.eth.Contract(NFTBaseData, address)
}
