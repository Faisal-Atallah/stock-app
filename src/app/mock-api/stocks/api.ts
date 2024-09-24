import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";
import { stocks } from "./data";
import { MockApiService } from "../../../../projects/mock-api/src/public-api";

@Injectable({
    providedIn: 'root'
})
export class StocksMockApi {
    private _stocks = stocks;

    constructor(private _mockApiService: MockApiService) {
        this.registerHandlers();
    }

    registerHandlers() {
        this._mockApiService.onGet('api/stocks')
            .reply(() => {
                const stocksData = cloneDeep(this._stocks);
                return [200, stocksData];
            });
    }
}