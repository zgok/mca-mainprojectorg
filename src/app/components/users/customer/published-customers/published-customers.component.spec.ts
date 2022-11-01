import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedCustomersComponent } from './published-customers.component';

describe('PublishedCustomersComponent', () => {
  let component: PublishedCustomersComponent;
  let fixture: ComponentFixture<PublishedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
