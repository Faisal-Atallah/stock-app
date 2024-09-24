import { Routes } from '@angular/router';
import { StocksComponent } from './pages/stocks/stocks.component';
import { inject } from '@angular/core';
import { StocksService } from './pages/stocks';

export const routes: Routes = [
    {
        path: '',
        component: StocksComponent,
        resolve: {
            stocks: () => inject(StocksService).getStocks()
        }
    }
];
