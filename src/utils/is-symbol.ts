/**
 * @internal
 */
export const isSymbol = (symbol: any): symbol is Symbol => {

    return typeof symbol === 'symbol';
};
