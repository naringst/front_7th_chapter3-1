/**
 * Design System Elevation/Shadow Tokens
 *
 * 그림자와 elevation을 정의합니다.
 */

/**
 * Shadow Tokens
 */
export const shadowTokens = {
  normal: {
    default:
      '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
    ios: '0px 1px 2px rgba(0, 0, 0, 0.16)',
    android: '1dp',
  },
  emphasize: {
    default:
      '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
    ios: '0px 2px 8px rgba(0, 0, 0, 0.16)',
    android: '3dp',
  },
  strong: {
    default:
      '0px 6px 12px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(0, 0, 0, 0.08), 0px 0px 4px rgba(0, 0, 0, 0.08)',
    ios: '0px 4px 12px rgba(0, 0, 0, 0.22)',
    android: '6dp',
  },
  heavy: {
    default:
      '0px 16px 20px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(0, 0, 0, 0.08)',
    ios: '0px 8px 24px rgba(0, 0, 0, 0.28)',
    android: '12dp',
  },
} as const;

/**
 * Semantic Shadow Token 이름을 생성하는 헬퍼 함수
 */
export function getShadowToken(name: keyof typeof shadowTokens): string {
  return `style-semantic-shadow-${name}`;
}

/**
 * Semantic Shadow Token CSS 변수 이름을 생성하는 헬퍼 함수
 */
export function getShadowVariable(name: keyof typeof shadowTokens): string {
  return `--${getShadowToken(name)}`;
}
