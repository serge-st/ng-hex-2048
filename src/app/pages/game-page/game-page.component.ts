import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { GameSetupService } from '@app/shared/services/game-setup';
import { GameState } from '@app/shared/types';
import { GridComponent } from '@app/widgets/grid';
import { GameControlComponent } from '@app/widgets/game-control';
import { GameOverControlComponent } from '@app/widgets/game-over-control';
import { DesktopBreakpointDirective } from '@app/shared/directives/desktop-breakpoint.directive';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GridComponent, GameControlComponent, GameOverControlComponent, AsyncPipe, NgIf, DesktopBreakpointDirective],
  templateUrl: './game-page.component.html',
  styleUrls: ['../pages-styles.scss', './game-page.component.scss'],
})
export class GamePageComponent {
  gameState$!: Observable<GameState>;

  constructor(private readonly gameSetupService: GameSetupService) {
    this.gameState$ = this.gameSetupService.state$.pipe(map((state) => state.gameState));
  }

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
