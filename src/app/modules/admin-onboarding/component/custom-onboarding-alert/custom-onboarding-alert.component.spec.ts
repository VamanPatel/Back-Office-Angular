import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOnboardingAlertComponent } from './custom-onboarding-alert.component';

describe('CustomOnboardingAlertComponent', () => {
  let component: CustomOnboardingAlertComponent;
  let fixture: ComponentFixture<CustomOnboardingAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomOnboardingAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOnboardingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
