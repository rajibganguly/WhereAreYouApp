import { TestBed } from '@angular/core/testing';

import { MyRestCallServiceService } from './my-rest-call-service.service';

describe('MyRestCallServiceService', () => {
  let service: MyRestCallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRestCallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
