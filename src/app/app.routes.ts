import { Route } from '@angular/router';
import { AboutPageComponent, GamePageComponent, GameSetupPageComponent } from './pages';
import { canStartGameGuard } from './shared/guards';
import { AppRoute as AppPath } from './shared/types';

type AppRoute = Omit<Route, 'path'> & {
  path: AppPath;
};

type AppRoutes = AppRoute[];

export const routes: AppRoutes = [
  { path: 'game', component: GamePageComponent, canActivate: [canStartGameGuard] },
  { path: 'game-setup', component: GameSetupPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: 'game-setup', pathMatch: 'full' },
];
