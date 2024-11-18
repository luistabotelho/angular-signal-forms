import { TestBed } from '@angular/core/testing';

import { SignalFormsService } from './signal-forms.service';

describe('SignalFormsService', () => {
  let service: SignalFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
