import { TestBed, inject } from '@angular/core/testing';

import { ChantiersService } from './chantiers.service';

describe('ChantiersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChantiersService]
    });
  });

  it('should be created', inject([ChantiersService], (service: ChantiersService) => {
    expect(service).toBeTruthy();
  }));
});
