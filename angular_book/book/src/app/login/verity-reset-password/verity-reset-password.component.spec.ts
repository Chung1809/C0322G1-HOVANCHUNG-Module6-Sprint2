import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerityResetPasswordComponent } from './verity-reset-password.component';

describe('VerityResetPasswordComponent', () => {
  let component: VerityResetPasswordComponent;
  let fixture: ComponentFixture<VerityResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerityResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerityResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
