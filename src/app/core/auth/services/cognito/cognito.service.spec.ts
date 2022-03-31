import { TestBed } from '@angular/core/testing';

import { CognitoAuthService } from './cognito.service';

describe('CognitoService', () => {
  let service: CognitoAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CognitoAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
