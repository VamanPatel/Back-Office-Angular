import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTbillComponent } from './edit-tbill.component';

describe('EditTbillComponent', () => {
  let component: EditTbillComponent;
  let fixture: ComponentFixture<EditTbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
