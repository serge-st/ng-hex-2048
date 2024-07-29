import { Observable } from 'rxjs';
import { GameSetupState } from '../../game-setup';
import { HexManagementState } from '../../hex-management';

export type RootState = Observable<{
  gameSetupState: GameSetupState;
  hexManagementState: HexManagementState;
}>;
