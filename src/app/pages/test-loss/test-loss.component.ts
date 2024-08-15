import { Component, OnInit } from '@angular/core';
import { HexManagementService, GameSetupService } from '@app/shared/services';
import { GamePageComponent } from '../game-page/game-page.component';

@Component({
  selector: 'app-test-loss',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './test-loss.component.html',
  styleUrl: './test-loss.component.scss',
})
export class TestLossComponent implements OnInit {
  constructor(
    readonly hexManagementService: HexManagementService,
    readonly gameSetupService: GameSetupService,
  ) {}

  ngOnInit(): void {
    this.gameSetupService.setRadius(1);
    this.gameSetupService.setGameState('in-progress');

    this.hexManagementService.setHexData([
      { q: 0, r: -1, s: 1, value: 8, id: 100 },
      { q: 0, r: 0, s: 0, value: 16, id: 200 },
      { q: 1, r: 0, s: -1, value: 32, id: 400 },
      { q: -1, r: 1, s: 0, value: 64, id: 600 },
      { q: 1, r: -1, s: 0, value: 128, id: 700 },
      { q: 0, r: 1, s: -1, value: 256, id: 800 },
    ]);
  }
}
