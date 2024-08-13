import { Component } from '@angular/core';
import { GridComponent } from '@app/widgets/grid';
import { LinkComponent } from '@app/shared/components/UI';
import { GameSetupComponent } from '@app/widgets/game-setup';
import { VIEWED_ABOUT_PAGE_STORAGE_KEY } from '@app/shared/constants';
import { GameSetupService } from '@app/shared/services/game-setup';
import { GameState } from '@app/shared/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-game-setup-page',
  standalone: true,
  imports: [GameSetupComponent, GridComponent, LinkComponent],
  templateUrl: './game-setup-page.component.html',
  styleUrls: ['../pages-styles.scss' /*'./game-setup-page.component.scss'*/],
})
export class GameSetupPageComponent {
  radius!: number;
  gap!: number;
  hexWidth!: number;
  gameState!: GameState;

  constructor(private readonly gameSetupService: GameSetupService) {
    this.subscribeToGameSetupState();
  }

  private subscribeToGameSetupState() {
    this.gameSetupService.state$
      .pipe(takeUntilDestroyed())
      .pipe(distinctUntilChanged((prev, curr) => isEqual(prev, curr)))
      .subscribe((state) => {
        this.radius = state.radius;
        this.gap = state.gap;
        this.hexWidth = state.hexWidth;
        this.gameState = state.gameState;
      });
  }

  clearSessionStorage(): void {
    sessionStorage.removeItem(VIEWED_ABOUT_PAGE_STORAGE_KEY);
  }
}
