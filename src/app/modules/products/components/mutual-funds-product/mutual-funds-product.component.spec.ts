import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsProductComponent } from './mutual-funds-product.component';

describe('MutualFundsProductComponent', () => {
  let component: MutualFundsProductComponent;
  let fixture: ComponentFixture<MutualFundsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
