import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppRoute } from '../../types';
import { VIEWED_ABOUT_PAGE_STORAGE_KEY } from '@app/shared/constants';

type AppCommand = AppRoute;

export const isFirstSessionGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const router = inject(Router);
  const commands: AppCommand[] = ['game-setup'];

  const viewedAboutPage = sessionStorage.getItem(VIEWED_ABOUT_PAGE_STORAGE_KEY) === 'true';

  return viewedAboutPage ? router.navigate(commands) : true;
};
