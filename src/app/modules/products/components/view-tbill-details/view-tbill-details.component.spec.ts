import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTbillDetailsComponent } from './view-tbill-details.component';

describe('ViewTbillDetailsComponent', () => {
  let component: ViewTbillDetailsComponent;
  let fixture: ComponentFixture<ViewTbillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTbillDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTbillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
