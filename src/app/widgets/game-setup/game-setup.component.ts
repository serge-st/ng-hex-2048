import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent, NumberInputComponent, LinkComponent } from '@app/shared/components/UI';
import { BreakpointObserverService, GameSetupService, HexManagementService } from '@app/shared/services';
import { isEqual } from 'lodash';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [FormsModule, NumberInputComponent, RouterLink, ButtonComponent, LinkComponent, NgClass],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent implements OnInit {
  @Input({ required: true }) radius!: number | null;
  @Input({ required: true }) gap!: number | null;
  @Input({ required: true }) hexWidth!: number | null;

  isDesktop!: boolean;
  isMobile!: boolean;

  constructor(
    readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
    private readonly breakpointObserverService: BreakpointObserverService,
  ) {
    this.subscribeToBreakpointObserverService();
  }

  ngOnInit(): void {
    this.setGameState();
    this.setHexData();
  }

  startGame(): void {
    this.gameSetupService.setGameState('in-progress');
  }

  private subscribeToBreakpointObserverService(): void {
    this.breakpointObserverService.state$
      .pipe(takeUntilDestroyed())
      .pipe(distinctUntilChanged((prev, curr) => isEqual(prev, curr)))
      .subscribe((state) => {
        this.isDesktop = state.isDesktop;
        this.isMobile = state.isMobile;

        this.updateHexWidth();
      });
  }

  private setGameState(): void {
    if (this.gameSetupService.getGameState() === 'setup') return;

    this.gameSetupService.setGameState('setup');
  }

  private setHexData(): void {
    if (this.hexManagementService.getHexData().length === 0) return;

    this.hexManagementService.setHexData([]);
  }

  private updateHexWidth(): void {
    this.isDesktop ? this.gameSetupService.setHexWidth(100) : this.gameSetupService.setHexWidth(50);
  }
}
