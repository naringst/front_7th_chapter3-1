/**
 * Design System Semantic Tokens
 * 
 * Semantic token은 atomic token을 참조하여 의미론적 이름을 제공합니다.
 * 일부 semantic token은 opacity를 적용합니다.
 */

import { colorTokens, opacityValues } from './colors';

/**
 * Opacity를 적용한 색상 값을 계산하는 헬퍼 함수
 */
function applyOpacity(color: string, opacity: number): string {
  // HEX 색상을 RGBA로 변환
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Static Colors
 */
export const staticColors = {
  white: colorTokens.common[100],
  black: colorTokens.common[0],
} as const;

/**
 * Primary Colors
 */
export const primaryColors = {
  normal: colorTokens.blue[50],
  strong: colorTokens.blue[45],
  heavy: colorTokens.blue[40],
} as const;

/**
 * Label Colors
 */
export const labelColors = {
  normal: colorTokens.coolNeutral[10],
  strong: colorTokens.common[0],
  neutral: applyOpacity(
    colorTokens.coolNeutral[22],
    opacityValues[88],
  ),
  alternative: applyOpacity(
    colorTokens.coolNeutral[25],
    opacityValues[61],
  ),
  assistive: applyOpacity(
    colorTokens.coolNeutral[25],
    opacityValues[28],
  ),
  disable: applyOpacity(
    colorTokens.coolNeutral[25],
    opacityValues[16],
  ),
} as const;

/**
 * Background Colors
 */
export const backgroundColors = {
  normalNormal: colorTokens.common[100],
  normalAlternative: colorTokens.coolNeutral[99],
  elevatedNormal: colorTokens.common[100],
  elevatedAlternative: colorTokens.coolNeutral[99],
} as const;

/**
 * Interaction Colors
 */
export const interactionColors = {
  inactive: colorTokens.coolNeutral[70],
  disable: colorTokens.coolNeutral[98],
} as const;

/**
 * Line Colors
 */
export const lineColors = {
  normalNormal: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[22],
  ),
  normalNeutral: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[16],
  ),
  normalAlternative: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[8],
  ),
  solidNormal: colorTokens.coolNeutral[96],
  solidNeutral: colorTokens.coolNeutral[97],
  solidAlternative: colorTokens.coolNeutral[98],
} as const;

/**
 * Status Colors
 */
export const statusColors = {
  positive: colorTokens.green[50],
  cautionary: colorTokens.orange[50],
  negative: colorTokens.red[50],
} as const;

/**
 * Accent Background Colors
 */
export const accentBackgroundColors = {
  redOrange: colorTokens.redOrange[50],
  lime: colorTokens.lime[50],
  cyan: colorTokens.cyan[50],
  lightBlue: colorTokens.lightBlue[50],
  violet: colorTokens.violet[50],
  purple: colorTokens.purple[50],
  pink: colorTokens.pink[50],
} as const;

/**
 * Accent Foreground Colors
 */
export const accentForegroundColors = {
  red: colorTokens.red[40],
  redOrange: colorTokens.redOrange[48],
  orange: colorTokens.orange[39],
  lime: colorTokens.lime[37],
  green: colorTokens.green[40],
  cyan: colorTokens.cyan[40],
  lightBlue: colorTokens.lightBlue[40],
  blue: colorTokens.blue[45],
  violet: colorTokens.violet[45],
  purple: colorTokens.purple[40],
  pink: colorTokens.pink[46],
} as const;

/**
 * Inverse Colors
 */
export const inverseColors = {
  primary: colorTokens.blue[60],
  background: colorTokens.coolNeutral[15],
  label: colorTokens.coolNeutral[99],
} as const;

/**
 * Component Fill Colors
 */
export const componentFillColors = {
  normal: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[8],
  ),
  strong: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[16],
  ),
  alternative: applyOpacity(
    colorTokens.coolNeutral[50],
    opacityValues[5],
  ),
} as const;

/**
 * Component Material Colors
 */
export const componentMaterialColors = {
  dimmer: applyOpacity(
    colorTokens.coolNeutral[10],
    opacityValues[52],
  ),
} as const;

/**
 * 모든 Semantic Color Tokens
 */
export const semanticColorTokens = {
  static: staticColors,
  primary: primaryColors,
  label: labelColors,
  background: backgroundColors,
  interaction: interactionColors,
  line: lineColors,
  status: statusColors,
  accentBackground: accentBackgroundColors,
  accentForeground: accentForegroundColors,
  inverse: inverseColors,
  componentFill: componentFillColors,
  componentMaterial: componentMaterialColors,
} as const;

/**
 * Semantic Token 이름을 생성하는 헬퍼 함수
 */
export function getSemanticColorToken(
  category: keyof typeof semanticColorTokens,
  name: string,
): string {
  return `color-semantic-${category}-${name}`;
}

/**
 * Semantic Token CSS 변수 이름을 생성하는 헬퍼 함수
 */
export function getSemanticColorVariable(
  category: keyof typeof semanticColorTokens,
  name: string,
): string {
  return `--${getSemanticColorToken(category, name)}`;
}

