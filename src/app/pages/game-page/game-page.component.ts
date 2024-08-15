import { Component, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { GameSetupService } from '@app/shared/services/game-setup';
import { GridComponent } from '@app/widgets/grid';
import { GameControlComponent } from '@app/widgets/game-control';
import { GameOverControlComponent } from '@app/widgets/game-over-control';
import { DesktopBreakpointDirective } from '@app/shared/directives';
import { HexManagementService } from '@app/shared/services';
import { isSameHexArray } from '@app/shared/helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GridComponent, GameControlComponent, GameOverControlComponent, AsyncPipe, NgIf, DesktopBreakpointDirective],
  templateUrl: './game-page.component.html',
  styleUrls: ['../pages-styles.scss', './game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  radius$ = this.gameSetupService.state$.pipe(map((state) => state.radius));
  gap$ = this.gameSetupService.state$.pipe(map((state) => state.gap));
  hexWidth$ = this.gameSetupService.state$.pipe(map((state) => state.hexWidth));
  gameState$ = this.gameSetupService.state$.pipe(map((state) => state.gameState));

  hexData$ = this.hexManagementService.state$
    .pipe(distinctUntilChanged((prev, curr) => isSameHexArray(prev.hexData, curr.hexData)))
    .pipe(map((state) => state.hexData));

  hexesToDelete$ = this.hexManagementService.state$
    .pipe(distinctUntilChanged((prev, curr) => isSameHexArray(prev.hexesToDelete, curr.hexesToDelete)))
    .pipe(map((state) => state.hexesToDelete));

  isLoading$ = this.hexManagementService.state$.pipe(map((state) => state.isLoading));

  constructor(
    private readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
    // TODO remove after testing
    private readonly router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // TODO remove after testing
    const path = this.router.snapshot.routeConfig?.path;
    if (path === 'tl' || path === 'tw') return;
    // TODO end

    this.setHexData();
  }

  private setHexData(): void {
    if (this.hexManagementService.getHexData().length === 0) return;

    this.hexManagementService.setHexDataAndHexesToDelete([], []);
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
