import { Component } from '@angular/core';
import { GridComponent } from '@app/widgets/grid';
import { LinkComponent } from '@app/shared/components/UI';
import { GameSetupComponent } from '@app/widgets/game-setup';
import { VIEWED_ABOUT_PAGE_STORAGE_KEY } from '@app/shared/constants';

@Component({
  selector: 'app-game-setup-page',
  standalone: true,
  imports: [GameSetupComponent, GridComponent, LinkComponent],
  templateUrl: './game-setup-page.component.html',
  styleUrls: ['../pages-styles.scss' /*'./game-setup-page.component.scss'*/],
})
export class GameSetupPageComponent {
  clearSessionStorage(): void {
    sessionStorage.removeItem(VIEWED_ABOUT_PAGE_STORAGE_KEY);
  }
}
