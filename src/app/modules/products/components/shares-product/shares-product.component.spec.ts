import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesProductComponent } from './shares-product.component';

describe('SharesProductComponent', () => {
  let component: SharesProductComponent;
  let fixture: ComponentFixture<SharesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharesProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
