import { TestBed } from '@angular/core/testing';

import { GetAllPaginationService } from './get-all-pagination.service';

describe('GetAllPaginationService', () => {
  let service: GetAllPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
