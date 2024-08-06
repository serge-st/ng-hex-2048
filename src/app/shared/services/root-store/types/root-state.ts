import { Observable } from 'rxjs';
import { GameSetupState } from '../../game-setup';
import { HexManagementState } from '../../hex-management';
import { BreakpointObserverState } from '../../breakpoint-observer';

export type RootState = Observable<{
  gameSetupState: GameSetupState;
  hexManagementState: HexManagementState;
  breakpointObserverState: BreakpointObserverState;
}>;
