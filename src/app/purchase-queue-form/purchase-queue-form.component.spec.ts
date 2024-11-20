import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQueueFormComponent } from './purchase-queue-form.component';

describe('PurchaseQueueFormComponent', () => {
  let component: PurchaseQueueFormComponent;
  let fixture: ComponentFixture<PurchaseQueueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseQueueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseQueueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
