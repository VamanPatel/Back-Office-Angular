import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsProductComponent } from './bonds-product.component';

describe('BondsProductComponent', () => {
  let component: BondsProductComponent;
  let fixture: ComponentFixture<BondsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
