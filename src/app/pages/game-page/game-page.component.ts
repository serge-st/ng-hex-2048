import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { GameSetupService } from '@app/shared/services/game-setup';
import { GridComponent } from '@app/widgets/grid';
import { GameControlComponent } from '@app/widgets/game-control';
import { GameOverControlComponent } from '@app/widgets/game-over-control';
import { DesktopBreakpointDirective } from '@app/shared/directives';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GridComponent, GameControlComponent, GameOverControlComponent, AsyncPipe, NgIf, DesktopBreakpointDirective],
  templateUrl: './game-page.component.html',
  styleUrls: ['../pages-styles.scss', './game-page.component.scss'],
})
export class GamePageComponent {
  radius$ = this.gameSetupService.state$.pipe(map((state) => state.radius));
  gap$ = this.gameSetupService.state$.pipe(map((state) => state.gap));
  hexWidth$ = this.gameSetupService.state$.pipe(map((state) => state.hexWidth));
  gameState$ = this.gameSetupService.state$.pipe(map((state) => state.gameState));

  constructor(private readonly gameSetupService: GameSetupService) {}

  get isInProgress$(): Observable<boolean> {
    return this.gameState$.pipe(map((state) => state === 'in-progress'));
  }

  get isGameOver$(): Observable<boolean> {
    return this.gameState$.pipe(map((state) => state === 'game-over'));
  }

  get isWin$(): Observable<boolean> {
    return this.gameState$.pipe(map((state) => state === 'win'));
  }
}
