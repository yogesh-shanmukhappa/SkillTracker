import { TestBed, inject } from '@angular/core/testing';

import { CronService } from './cron.service';

describe('CronService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CronService]
    });
  });

  it('should be created', inject([CronService], (service: CronService) => {
    expect(service).toBeTruthy();
  }));
});
