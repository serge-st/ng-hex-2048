import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isFirstSessionGuard } from './is-first-session.guard';

describe('canStartGameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isFirstSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
