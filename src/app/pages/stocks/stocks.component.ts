import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MockSignalrService } from '../../shared/services/mock-signalr';
import { StockData } from '../../shared/types';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { unsubscribe } from '../../core/utils/app.utils';
import { CommonModule } from '@angular/common';
import { ToggleButtonComponent } from '../../widget/toggle-button';
import { StocksService } from './stocks.service';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, ToggleButtonComponent],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  isDesktopView = true;
  stocks: { [key: string]: StockData } = {};

  constructor(
    private _mockSignalrService: MockSignalrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _stocksService: StocksService
  ) { }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._getStocksData();
    this.onResize(null);
  }


  /**
   * Get Stocks Data
   */
  private _getStocksData(): void {
    this._stocksService.stocksData$
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap((initialStockData) => {

          this.stocks = initialStockData;

          this._mockSignalrService.startMockStockPriceUpdates(this.stocks);

          return this._mockSignalrService.stockPrice$;
        })
      )
      .subscribe((updatedStocks) => {
        this.stocks = updatedStocks;
        this._changeDetectorRef.markForCheck();
      })
  }

  /**
   * Toggle Stock
   * @param {string} symbol 
   */
  toggleStock(symbol: string, disabled: boolean): void {
    this._mockSignalrService.toggleStock(symbol, disabled);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== "undefined") {
      this.isDesktopView = window.innerWidth > 600;
    }
  }

  /**
   * On Destroy
   */
  ngOnDestroy(): void {
    unsubscribe(this._unsubscribeAll);
  }
}
