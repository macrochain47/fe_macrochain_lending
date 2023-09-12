import { NFTBaseData } from "@/contracts/NFTBase"
import { LendingData } from "@/contracts/Lending"
import { ERC2Data } from "@/contracts/ERC20"
export const getNFTBaseContract = (web3 : any, address : string) => {
    return new web3.eth.Contract( NFTBaseData, address )
}

export const getLendingContract = (web3: any, address: string) => {
    return new web3.eth.Contract(LendingData, address)
}

export const getERC20Contract = (web3: any, address: string) => {
    return new web3.eth.Contract(ERC2Data, address)
}