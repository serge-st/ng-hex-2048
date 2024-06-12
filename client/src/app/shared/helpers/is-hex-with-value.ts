import { HexCoord, HexData } from '../interfaces';

export const isHexWithValue = (hex: HexCoord | HexData): hex is HexData => {
  return 'value' in hex;
};
