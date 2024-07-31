import { ColorType } from '../types';

export const DANGER_COLORS: ColorType = {
  basic: {
    color: '#fff',
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  hover: {
    backgroundColor: '#bb2d3b',
    borderColor: '#b02a37',
  },
  active: {
    backgroundColor: '#b02a37',
    borderColor: '#a52834',
  },
  focus: {
    backgroundColor: '#bb2d3b',
    borderColor: '#b02a37',
    boxShadowRGB: '225 83 97',
  },
  disabled: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: '#fff',
  },
} as const;
