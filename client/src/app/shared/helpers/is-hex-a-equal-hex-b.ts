import { isHexWithValue } from './is-hex-with-value';
import { HexCoord, HexData } from '@app/shared/interfaces';
import { HexCoordKey, HexDataKey } from '../types';

export const isHexAEqualHexB = (hexA: HexCoord | HexData, hexB: HexCoord | HexData): boolean => {
  if (!hexA || !hexB) return false;

  const hexCoordKeys = ['q', 's', 'r'] as HexCoordKey[];

  const hasMismatch = isHexWithValue(hexA)
    ? hexCoordKeys.some((key) => hexA[key] !== hexB[key])
    : // @ts-ignore
      ([...hexCoordKeys, 'value'] as HexDataKey[]).some((key) => hexA[key] !== hexB[key]);
  return !hasMismatch;
};
