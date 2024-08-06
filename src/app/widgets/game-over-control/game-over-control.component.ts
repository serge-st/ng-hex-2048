import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameSetupService } from '@app/shared/services/game-setup';
import { HexManagementService } from '@app/shared/services/hex-management';
import { ButtonComponent } from '../../shared/components/UI/button/button.component';
import { LinkComponent } from '@app/shared/components/UI/link/link.component';

@Component({
  selector: 'app-game-over-control',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ButtonComponent, LinkComponent],
  templateUrl: './game-over-control.component.html',
  styleUrl: './game-over-control.component.scss',
})
export class GameOverControlComponent {
  constructor(
    private readonly gameSetupService: GameSetupService,
    private readonly hexManagementService: HexManagementService,
  ) {}

  restartGame(): void {
    this.hexManagementService.setHexData([]);
    this.gameSetupService.setGameState('in-progress');
  }
}
