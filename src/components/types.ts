import { CSSProperties } from 'react';

type CSSValue = string | number;

export type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: CSSValue;
}; 