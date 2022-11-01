import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedprojectsComponent } from './unfinishedprojects.component';

describe('UnfinishedprojectsComponent', () => {
  let component: UnfinishedprojectsComponent;
  let fixture: ComponentFixture<UnfinishedprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfinishedprojectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfinishedprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
