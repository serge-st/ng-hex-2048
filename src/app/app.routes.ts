import { Route } from '@angular/router';
import { AboutPageComponent, GamePageComponent, GameSetupPageComponent } from './pages';
import { canStartGameGuard, isFirstSessionGuard } from './shared/guards';
import { AppRoute as AppPath } from './shared/types';
import { TestWinComponent } from './pages/test-win/test-win.component';
import { TestLossComponent } from './pages/test-loss/test-loss.component';

type AppRoute = Omit<Route, 'path'> & {
  path: AppPath;
};

type AppRoutes = AppRoute[];

export const routes: AppRoutes = [
  { path: 'game', component: GamePageComponent, canActivate: [canStartGameGuard] },
  { path: 'game-setup', component: GameSetupPageComponent },
  { path: 'about', component: AboutPageComponent, canActivate: [isFirstSessionGuard] },
  // TODO: remove after testing
  // @ts-ignore
  { path: 'tw', component: TestWinComponent },
  // @ts-ignore
  { path: 'tl', component: TestLossComponent },
  { path: '**', redirectTo: 'about', pathMatch: 'full' },
];
