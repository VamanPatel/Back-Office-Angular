import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbillsProductComponent } from './tbills-product.component';

describe('TbillsProductComponent', () => {
  let component: TbillsProductComponent;
  let fixture: ComponentFixture<TbillsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbillsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbillsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
