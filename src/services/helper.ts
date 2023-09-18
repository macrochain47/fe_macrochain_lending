import { USDC_CT_Address, USDT_CT_Address } from "@/constants/addressContract";

export const shortenString = (str: string, headCount: number, tailCount: number): string => {
    if (str.length <= headCount + tailCount) {
        return str;
    }
    return str.substring(0, headCount) + "..." + str.substring(str.length - tailCount);
}

/**
 * Get info about loan {repayment, interest}
 * @param principal 
 * @param apr 
 * @param duration 
 * @param durationType
 * @returns 
 */
export const countRepayment = (principal: number, apr: number, duration: number, durationType: string): number | null => {
    if (!['day', 'week', 'month'].includes(durationType)) return null;
    if (durationType === 'day') return Number(Number(principal + principal*duration/365 * apr / 100).toFixed(2));
    if (durationType === 'week') return Number(Number(principal + principal*7*duration/365 * apr / 100).toFixed(2));
    else return Number(Number(principal + principal*30*duration/365*apr/100).toFixed(2));
}

export const getAddressOfStableCoin = (type: string): string => {
    console.log(type)
    if (type === "USDT") return USDT_CT_Address
    else return USDC_CT_Address
}