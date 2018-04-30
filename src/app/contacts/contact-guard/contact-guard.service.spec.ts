import { TestBed, inject } from '@angular/core/testing';

import { ContactGuardService } from './contact-guard.service';

describe('ContactGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactGuardService]
    });
  });

  it('should be created', inject([ContactGuardService], (service: ContactGuardService) => {
    expect(service).toBeTruthy();
  }));
});
