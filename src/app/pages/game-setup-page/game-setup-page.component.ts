import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@app/widgets/grid';
import { LinkComponent } from '@app/shared/components/UI';
import { GameSetupComponent } from '@app/widgets/game-setup';
import { VIEWED_ABOUT_PAGE_STORAGE_KEY } from '@app/shared/constants';
import { GameSetupService } from '@app/shared/services/game-setup';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HexManagementService } from '@app/shared/services';

@Component({
  selector: 'app-game-setup-page',
  standalone: true,
  imports: [GameSetupComponent, GridComponent, LinkComponent, AsyncPipe],
  templateUrl: './game-setup-page.component.html',
  styleUrls: ['../pages-styles.scss' /*'./game-setup-page.component.scss'*/],
})
export class GameSetupPageComponent implements OnInit {
  radius$ = this.gameSetupService.state$.pipe(map((state) => state.radius));
  gap$ = this.gameSetupService.state$.pipe(map((state) => state.gap));
  hexWidth$ = this.gameSetupService.state$.pipe(map((state) => state.hexWidth));
  gameState$ = this.gameSetupService.state$.pipe(map((state) => state.gameState));

  constructor(
    private readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
  ) {}

  ngOnInit(): void {
    this.setGameState();
    this.setHexData;
  }

  private setGameState(): void {
    if (this.gameSetupService.getGameState() === 'setup') return;

    this.gameSetupService.setGameState('setup');
  }

  private setHexData(): void {
    if (this.hexManagementService.getHexData().length === 0) return;

    this.hexManagementService.setHexDataAndHexesToDelete([], []);
  }

  clearSessionStorage(): void {
    sessionStorage.removeItem(VIEWED_ABOUT_PAGE_STORAGE_KEY);
  }
}
