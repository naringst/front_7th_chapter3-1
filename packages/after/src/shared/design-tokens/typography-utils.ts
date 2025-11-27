/**
 * Typography Utility Functions
 * 타이포그래피 토큰을 사용하기 위한 유틸리티 함수들
 */

import { typographyTokens } from './typography';

/**
 * 타이포그래피 토큰을 CSS 클래스로 변환
 */
export function getTypographyClass(tokenName: keyof typeof typographyTokens): string {
  const token = typographyTokens[tokenName];
  if (!token) {
    console.warn(`Typography token "${tokenName}" not found`);
    return '';
  }

  return `text-[var(--typography-${tokenName}-font-size)] leading-[var(--typography-${tokenName}-line-height)] tracking-[var(--typography-${tokenName}-letter-spacing)]`;
}

/**
 * 타이포그래피 스타일 객체 생성
 */
export function getTypographyStyle(tokenName: keyof typeof typographyTokens): React.CSSProperties {
  const token = typographyTokens[tokenName];
  if (!token) {
    console.warn(`Typography token "${tokenName}" not found`);
    return {};
  }

  return {
    fontSize: `var(--typography-${tokenName}-font-size)`,
    lineHeight: `var(--typography-${tokenName}-line-height)`,
    letterSpacing: `var(--typography-${tokenName}-letter-spacing)`,
  };
}

