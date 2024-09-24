import { StockData } from "../../shared/types";

export const stocks: { [key: string]: StockData } = {
    AAPL: {
        name: 'Apple',
        currentPrice: 150,
        highPrice: 152,
        lowPrice: 148,
        week52High: 180,
        week52Low: 120,
        previousClose: 149,
        disabled: false
    },
    MSFT: {
        name: 'Microsoft',
        currentPrice: 280,
        highPrice: 285,
        lowPrice: 275,
        week52High: 300,
        week52Low: 250,
        previousClose: 278,
        disabled: false
    },
    TSLA: {
        name: 'Tesla',
        currentPrice: 700,
        highPrice: 710,
        lowPrice: 690,
        week52High: 900,
        week52Low: 550,
        previousClose: 695,
        disabled: false
    },
    GOOGL: {
        name: 'Alphabet',
        currentPrice: 2700,
        highPrice: 2720,
        lowPrice: 2650,
        week52High: 3000,
        week52Low: 2000,
        previousClose: 2680,
        disabled: false
    }
};