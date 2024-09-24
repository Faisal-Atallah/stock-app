export type StockData = {
    name: string;
    currentPrice: number | null;
    highPrice: number | null;
    lowPrice: number | null;
    week52High?: number | null;
    week52Low?: number | null;
    disabled?: boolean;
    previousClose: number;
}
