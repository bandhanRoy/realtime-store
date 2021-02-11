import { TestBed } from '@angular/core/testing';

import { SideNavService } from './sidenav.service';

describe('SideNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideNavService = TestBed.get(SideNavService);
    expect(service).toBeTruthy();
  });
});
