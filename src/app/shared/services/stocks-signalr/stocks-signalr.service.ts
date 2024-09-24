import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksSignalrService {

  private _connection: signalR.HubConnection;
  private _stocksPrice = new BehaviorSubject<any>(null);

  stocksPrice$ = this._stocksPrice.asObservable();

  constructor() {
    this._startConnection();
  }

  private _startConnection(): void {
    this._connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('https://localhost:5001/stocks', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling
      })
      .build();

    this._connection
      .start()
      .then(() => {
        console.log('SignalR connected');
        this._mockPrices();
      })
      .catch(err => console.error('Connection error:', err));
  }


  private _mockPrices(): void {
    setInterval(() => {
      const mockStockData = {
        AAPL: this._getRandomPrice(150, 180),
        MSFT: this._getRandomPrice(250, 280),
        TSLA: this._getRandomPrice(650, 700),
        GOOGL: this._getRandomPrice(2800, 3000),
      };
      this._stocksPrice.next(mockStockData);
    }, 3000);
  }

  private _getRandomPrice(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
}
