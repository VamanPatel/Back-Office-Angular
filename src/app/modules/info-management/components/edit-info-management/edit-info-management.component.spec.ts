import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoManagementComponent } from './edit-info-management.component';

describe('EditInfoManagementComponent', () => {
  let component: EditInfoManagementComponent;
  let fixture: ComponentFixture<EditInfoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
