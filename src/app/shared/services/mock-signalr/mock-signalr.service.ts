import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, Observable, Subscription } from 'rxjs';
import { StockData } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class MockSignalrService {

  private _stockPriceSource = new BehaviorSubject<{ [key: string]: StockData }>({});
  private _priceUpdateSubscription: Subscription | null = null;


  get stockPrice$(): Observable<{ [key: string]: StockData }> {
    return this._stockPriceSource.asObservable();
  }

  constructor() { }


  /**
   * Start Mock Stocks Price Updates
   * @param { [key: string]: StockData } initialData 
   */
  startMockStockPriceUpdates(initialData: { [key: string]: StockData }) {
    const stocks = { ...initialData };

    // Ensure to stop any previous interval before starting a new one
    this._stopMockStockPriceUpdates();

    this._priceUpdateSubscription = interval(3000).pipe(
      map(() => {
        // Simulate stock price updates
        Object.keys(stocks).forEach(symbol => {
          const stock = stocks[symbol];
          if (!stock.disabled) {
            const priceChange = (Math.random() * 10 - 5);
            stock.currentPrice += priceChange;
            stock.highPrice = Math.max(stock.currentPrice, stock.highPrice);
            stock.lowPrice = Math.min(stock.currentPrice, stock.lowPrice);
          }
        });

        return { ...stocks };
      })
    ).subscribe(updatedStocks => {
      this._stockPriceSource.next(updatedStocks);
    });
  }

  /**
  * Stop Mock Stocks Price Updates
  */
  private _stopMockStockPriceUpdates(): void {
    if (this._priceUpdateSubscription) {
      this._priceUpdateSubscription.unsubscribe();
      this._priceUpdateSubscription = null;
    }
  }

  /**
   * Toggle Stock
   * @param {string} symbol 
   * @param {boolean} disabled 
   */
  toggleStock(symbol: string, disabled: boolean): void {
    const currentStocks = this._stockPriceSource.getValue();
    if (currentStocks[symbol]) {
      currentStocks[symbol].disabled = disabled;
      this._stockPriceSource.next({ ...currentStocks });
    }
  }

}
