import { Component } from '@angular/core';
import { GameSetupComponent } from '@app/widgets/game-setup';
import { GridComponent } from '@app/widgets/grid';

@Component({
  selector: 'app-game-setup-page',
  standalone: true,
  imports: [GameSetupComponent, GridComponent],
  templateUrl: './game-setup-page.component.html',
  styleUrls: ['../pages-styles.scss', './game-setup-page.component.scss'],
})
export class GameSetupPageComponent {}
