import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQueueTableComponent } from './purchase-queue-table.component';

describe('PurchaseQueueTableComponent', () => {
  let component: PurchaseQueueTableComponent;
  let fixture: ComponentFixture<PurchaseQueueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQueueTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseQueueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
