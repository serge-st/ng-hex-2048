import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameSetupState } from './interfaces/game-setup-state';
import { GameState } from '@app/shared/types';

const initialState: GameSetupState = {
  radius: 2,
  gap: 4,
  hexWidth: 100,
  gameState: 'setup',
};

@Injectable({
  providedIn: 'root',
})
export class GameSetupService {
  private readonly state = new BehaviorSubject<GameSetupState>(initialState);

  readonly state$: Observable<GameSetupState> = this.state.asObservable();

  private getState(): GameSetupState {
    return this.state.value;
  }

  private setState(newState: Partial<GameSetupState>): void {
    this.state.next({ ...this.getState(), ...newState });
  }

  setRadius(radius: number): void {
    this.setState({ radius });
  }

  setGap(gap: number): void {
    this.setState({ gap });
  }

  setHexWidth(hexWidth: number): void {
    this.setState({ hexWidth });
  }

  setGameState(gameState: GameState): void {
    this.setState({ gameState });
  }

  getGameState(): GameState {
    return this.getState().gameState;
  }
}
