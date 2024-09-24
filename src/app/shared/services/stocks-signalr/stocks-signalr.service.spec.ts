import { TestBed } from '@angular/core/testing';

import { StocksSignalrService } from './stocks-signalr.service';

describe('StocksSignalrService', () => {
  let service: StocksSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
