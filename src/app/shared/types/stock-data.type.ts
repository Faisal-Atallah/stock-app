export type StockData = {
    name: string;
    currentPrice: number;
    highPrice: number;
    lowPrice: number;
    week52High?: number;
    week52Low?: number;
    disabled?: boolean;
    previousClose: number;
}
