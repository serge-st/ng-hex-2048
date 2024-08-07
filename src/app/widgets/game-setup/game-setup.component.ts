import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent, NumberInputComponent } from '@app/shared/components/UI';
import { LinkComponent } from '@app/shared/components/UI/link/link.component';
import { BreakpointObserverService } from '@app/shared/services/breakpoint-observer';
import { GameSetupService } from '@app/shared/services/game-setup';
import { HexManagementService } from '@app/shared/services/hex-management';
import { GameState } from '@app/shared/types';
import { Observable, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [FormsModule, NumberInputComponent, AsyncPipe, RouterLink, ButtonComponent, LinkComponent, NgClass],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent implements OnInit {
  radius$!: Observable<number>;
  gap$!: Observable<number>;
  hexWidth$!: Observable<number>;
  gameState$!: Observable<GameState>;
  isDesktop!: boolean;
  isMobile!: boolean;

  constructor(
    readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
    private readonly breakpointObserverService: BreakpointObserverService,
  ) {
    this.radius$ = this.gameSetupService.state$.pipe(map((state) => state.radius));
    this.gap$ = this.gameSetupService.state$.pipe(map((state) => state.gap));
    this.hexWidth$ = this.gameSetupService.state$.pipe(map((state) => state.hexWidth));
    this.gameState$ = this.gameSetupService.state$.pipe(map((state) => state.gameState));

    this.breakpointObserverService.state$
      .pipe(takeUntilDestroyed())
      .pipe(distinctUntilChanged((prev, curr) => prev.isDesktop === curr.isDesktop || prev.isMobile === curr.isMobile))
      .subscribe((state) => {
        this.isDesktop = state.isDesktop;
        this.isMobile = state.isMobile;
        if (state.isDesktop) {
          this.gameSetupService.setHexWidth(100);
        } else {
          this.gameSetupService.setHexWidth(50);
        }
      });
  }

  ngOnInit(): void {
    if (this.gameSetupService.getGameState() !== 'setup') {
      this.gameSetupService.setGameState('setup');
    }

    if (this.hexManagementService.getHexData().length > 0) {
      this.hexManagementService.setHexData([]);
    }
  }

  startGame(): void {
    this.gameSetupService.setGameState('in-progress');
  }
}
