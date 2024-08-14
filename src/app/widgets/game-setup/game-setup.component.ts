import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent, NumberInputComponent } from '@app/shared/components/UI';
import { BreakpointObserverService, GameSetupService } from '@app/shared/services';
import { isEqual } from 'lodash';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [FormsModule, NumberInputComponent, RouterLink, ButtonComponent, NgClass],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  @Input({ required: true }) radius!: number | null;
  @Input({ required: true }) gap!: number | null;
  @Input({ required: true }) hexWidth!: number | null;

  isDesktop!: boolean;
  isMobile!: boolean;
  isError = false;

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.code !== 'Enter') return;
    if (this.isError) return;

    this.startGame();
  }

  constructor(
    readonly gameSetupService: GameSetupService,
    private readonly breakpointObserverService: BreakpointObserverService,
    private readonly router: Router,
  ) {
    this.subscribeToBreakpointObserverService();
  }

  startGame(): void {
    this.gameSetupService.setGameState('in-progress');
    this.router.navigate(['game']);
  }

  setIsError(...childen: NumberInputComponent[]): void {
    this.isError = childen.some(({ isError }) => isError);
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

  private updateHexWidth(): void {
    this.isDesktop ? this.gameSetupService.setHexWidth(100) : this.gameSetupService.setHexWidth(50);
  }
}
