import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of, tap } from 'rxjs';
import { StockData } from '../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private _http = inject(HttpClient);
  private _stocks: BehaviorSubject<{ [key: string]: StockData }> = new BehaviorSubject<{ [key: string]: StockData }>(null);

  get stocksData$(): Observable<{ [key: string]: StockData }> {
    return this._stocks.asObservable();
  }

  /** 
   * Get Stocks
   * @returns {Observable<{ [key: string]: StockData }> }
   */
  getStocks(): Observable<{ [key: string]: StockData }> {
    return this._http.get<{ [key: string]: StockData }>('api/stocks').pipe(
      tap((stocks) => {
        this._stocks.next(stocks);
      }),
      catchError((error) => {
        return of({});
      }),
    );
  }

}
