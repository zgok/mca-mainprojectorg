import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpaymentcardComponent } from './cartpaymentcard.component';

describe('CartpaymentcardComponent', () => {
  let component: CartpaymentcardComponent;
  let fixture: ComponentFixture<CartpaymentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartpaymentcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpaymentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
