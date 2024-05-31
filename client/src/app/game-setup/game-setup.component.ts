import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberInputComponent } from '@app/number-input/number-input.component';
import { GameSetupService } from '@app/shared/services/game-setup';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [FormsModule, NumberInputComponent, AsyncPipe],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  radius$!: Observable<number>;
  gap$!: Observable<number>;
  hexWidth$!: Observable<number>;

  constructor(readonly gameSetupService: GameSetupService) {
    this.radius$ = this.gameSetupService.state$.pipe(map((state) => state.radius));
    this.gap$ = this.gameSetupService.state$.pipe(map((state) => state.gap));
    this.hexWidth$ = this.gameSetupService.state$.pipe(map((state) => state.hexWidth));
  }

  startGame() {
    this.gameSetupService.setIsGameInProgress(true, `GameSetupComponent.startGame: setIsGameInProgress`);
  }
}