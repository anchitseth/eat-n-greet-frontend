import { TestBed } from '@angular/core/testing';

import { PostmealserService } from './postmealser.service';

describe('PostmealserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostmealserService = TestBed.get(PostmealserService);
    expect(service).toBeTruthy();
  });
});
