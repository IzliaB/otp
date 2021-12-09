import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpProcessModalComponent } from './otp-process-modal.component';

describe('OtpProcessModalComponent', () => {
  let component: OtpProcessModalComponent;
  let fixture: ComponentFixture<OtpProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpProcessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
