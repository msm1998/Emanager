import { TestBed } from '@angular/core/testing';

import { EmployeeListResolverService } from './employee-list-resolver.service';

describe('EmployeeListResolverService', () => {
  let service: EmployeeListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
