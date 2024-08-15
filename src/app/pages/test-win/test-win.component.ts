import { Component, OnInit } from '@angular/core';
import { GamePageComponent } from '../game-page/game-page.component';
import { GameSetupService, HexManagementService } from '@app/shared/services';

@Component({
  selector: 'app-test-win',
  standalone: true,
  imports: [GamePageComponent],
  templateUrl: './test-win.component.html',
  styleUrl: './test-win.component.scss',
})
export class TestWinComponent implements OnInit {
  constructor(
    readonly hexManagementService: HexManagementService,
    readonly gameSetupService: GameSetupService,
  ) {}

  ngOnInit(): void {
    this.gameSetupService.setRadius(1);
    this.gameSetupService.setGameState('in-progress');

    this.hexManagementService.setHexData([
      { q: 0, r: -1, s: 1, value: 2, id: 100 },
      { q: 0, r: 0, s: 0, value: 1024, id: 200 },
      { q: 1, r: 0, s: -1, value: 1024, id: 400 },
      { q: -1, r: 1, s: 0, value: 4, id: 600 },
      { q: 1, r: -1, s: 0, value: 4, id: 700 },
      { q: 0, r: 1, s: -1, value: 2, id: 800 },
    ]);
  }
}
