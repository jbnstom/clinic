import { TestBed } from '@angular/core/testing';

import { SaveRegService } from './save-reg.service';

describe('SaveRegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveRegService = TestBed.get(SaveRegService);
    expect(service).toBeTruthy();
  });
});
