/**
 * Typography Tokens
 * 원티드 타이포그래피 시스템 - 7단계 위계, 18개 하위 위계
 * Mobile 기준
 */

export interface TypographyToken {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

export const typographyTokens: Record<string, TypographyToken> = {
  // Display
  'display-1': {
    fontSize: '56px',
    lineHeight: '72px', // 1.286
    letterSpacing: '-0.0319em',
  },
  'display-2': {
    fontSize: '40px',
    lineHeight: '52px', // 1.3
    letterSpacing: '-0.0282em',
  },

  // Title
  'title-1': {
    fontSize: '36px',
    lineHeight: '48px', // 1.334
    letterSpacing: '-0.027em',
  },
  'title-2': {
    fontSize: '28px',
    lineHeight: '38px', // 1.358
    letterSpacing: '-0.0236em',
  },
  'title-3': {
    fontSize: '24px',
    lineHeight: '32px', // 1.334
    letterSpacing: '-0.023em',
  },

  // Heading
  'heading-1': {
    fontSize: '22px',
    lineHeight: '30px', // 1.364
    letterSpacing: '-0.0194em',
  },
  'heading-2': {
    fontSize: '20px',
    lineHeight: '28px', // 1.4
    letterSpacing: '-0.012em',
  },

  // Headline
  'headline-1': {
    fontSize: '18px',
    lineHeight: '26px', // 1.445
    letterSpacing: '-0.002em',
  },
  'headline-2': {
    fontSize: '17px',
    lineHeight: '24px', // 1.412
    letterSpacing: '0em',
  },

  // Body
  'body-1-normal': {
    fontSize: '16px',
    lineHeight: '24px', // 1.5
    letterSpacing: '0.0057em',
  },
  'body-1-reading': {
    fontSize: '16px',
    lineHeight: '26px', // 1.625
    letterSpacing: '0.0057em',
  },
  'body-2-normal': {
    fontSize: '15px',
    lineHeight: '22px', // 1.467
    letterSpacing: '0.0096em',
  },
  'body-2-reading': {
    fontSize: '15px',
    lineHeight: '24px', // 1.6
    letterSpacing: '0.0096em',
  },

  // Label
  'label-1-normal': {
    fontSize: '14px',
    lineHeight: '20px', // 1.429
    letterSpacing: '0.0145em',
  },
  'label-1-reading': {
    fontSize: '14px',
    lineHeight: '22px', // 1.571
    letterSpacing: '0.0145em',
  },
  'label-2': {
    fontSize: '13px',
    lineHeight: '18px', // 1.385
    letterSpacing: '0.0194em',
  },

  // Caption
  'caption-1': {
    fontSize: '12px',
    lineHeight: '16px', // 1.334
    letterSpacing: '0.0252em',
  },
  'caption-2': {
    fontSize: '11px',
    lineHeight: '14px', // 1.273
    letterSpacing: '0.0311em',
  },
};

/**
 * Get typography token CSS variables
 */
export function getTypographyVariable(tokenName: string): string {
  return `var(--typography-${tokenName})`;
}

/**
 * Get typography token CSS variable for specific property
 */
export function getTypographyVariableForProperty(
  tokenName: string,
  property: 'font-size' | 'line-height' | 'letter-spacing',
): string {
  return `var(--typography-${tokenName}-${property.replace('-', '-')})`;
}

