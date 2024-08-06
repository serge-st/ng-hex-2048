import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GameSetupService } from '../game-setup';
import { HexManagementService } from '../hex-management';
import { RootState } from './types';
import { BreakpointObserverService } from '../breakpoint-observer';

@Injectable({
  providedIn: 'root',
})
export class RootStoreService {
  constructor(
    private gameSetupService: GameSetupService,
    private hexManagementService: HexManagementService,
    private breakpointObserverService: BreakpointObserverService,
  ) {}

  readonly state$: RootState = combineLatest({
    gameSetupState: this.gameSetupService.state$,
    hexManagementState: this.hexManagementService.state$,
    breakpointObserverState: this.breakpointObserverService.state$,
  });
}
