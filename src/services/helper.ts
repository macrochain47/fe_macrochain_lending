export const shortenString = (str: string, headCount: number, tailCount: number): string => {
    if (str.length <= headCount + tailCount) {
        return str;
    }
    return str.substring(0, headCount) + "..." + str.substring(str.length - tailCount);
}