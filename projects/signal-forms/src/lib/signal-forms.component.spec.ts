import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormsComponent } from './signal-forms.component';

describe('SignalFormsComponent', () => {
  let component: SignalFormsComponent;
  let fixture: ComponentFixture<SignalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
