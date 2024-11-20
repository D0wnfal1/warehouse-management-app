import { TestBed } from '@angular/core/testing';

import { PurchaseQueueService } from './purchase-queue.service';

describe('PurchaseQueueService', () => {
  let service: PurchaseQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
