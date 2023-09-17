import { ERC721CT, LendingCT } from "@/constants/addressContract"
import { ERC20_ABI } from "@/contracts/ERC20"
import { ERC721_ABI } from "@/contracts/ERC721"
import { Tangilend_ABI } from "@/contracts/Tangilend"


export const getERC721Contract = (web3 : any) => {
    return new web3.eth.Contract( ERC721_ABI, ERC721CT )
}

export const getLendingContract = (web3: any) => {
    return new web3.eth.Contract(Tangilend_ABI, LendingCT )
}

export const getERC20Contract = (web3: any, address: string) => {
    return new web3.eth.Contract(ERC20_ABI, address)
}