import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoManagementDetailsComponent } from './info-management-details.component';

describe('InfoManagementDetailsComponent', () => {
  let component: InfoManagementDetailsComponent;
  let fixture: ComponentFixture<InfoManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoManagementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
