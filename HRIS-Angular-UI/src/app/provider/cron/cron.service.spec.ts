import { TestBed, inject } from '@angular/core/testing';

import { SkilltrackerService } from './skilltracker.service';

describe('SkilltrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkilltrackerService]
    });
  });

  it('should be created', inject([SkilltrackerService], (service: SkilltrackerService) => {
    expect(service).toBeTruthy();
  }));
});
