import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTbillComponent } from './add-new-tbill.component';

describe('AddNewTbillComponent', () => {
  let component: AddNewTbillComponent;
  let fixture: ComponentFixture<AddNewTbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
