import { HexData } from '@app/shared/interfaces';

export interface HexManagementState {
  hexData: HexData[];
  hexesToDelete: HexData[];
  isInProgress: boolean;
}

export type HexManagementStateKey = keyof HexManagementState;
