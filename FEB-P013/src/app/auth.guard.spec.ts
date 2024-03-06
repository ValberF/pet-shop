import { TestBed } from '@angular/core/testing';
import { CanActivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service'; 
import { Router } from '@angular/router';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should be created', () => {
    const executeGuard: CanActivateFn = (...guardParameters): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => 
      TestBed.runInInjectionContext(() => new AuthGuard(authService, router).canActivate(...guardParameters));

    expect(executeGuard).toBeTruthy();
  });
});
