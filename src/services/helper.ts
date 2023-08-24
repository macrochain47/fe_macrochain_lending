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
 
    if (durationType === 'day') return (Math.round(principal + apr*principal*duration/(365*100))*100)/100
    if (durationType === 'week') return Math.round((principal + apr*principal*duration/(52*100))*100)/100
    else return Math.round((principal + apr*principal*duration/(12*100))*100)/100
}