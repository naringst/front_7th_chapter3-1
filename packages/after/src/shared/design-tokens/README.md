# Design System Color Tokens

디자인 시스템의 색상 토큰을 사용하는 방법을 안내합니다.

## 사용 방법

### 1. CSS 변수로 사용

```css
.my-element {
  background-color: var(--color-atomic-blue-50);
  color: var(--color-atomic-neutral-100);
}
```

### 2. Tailwind CSS로 사용

Tailwind CSS v4에서는 CSS 변수를 직접 사용할 수 있습니다:

```tsx
<div className="bg-[var(--color-atomic-blue-50)] text-[var(--color-atomic-neutral-100)]">
  내용
</div>
```

### 3. TypeScript에서 사용

```tsx
import {
  colorTokens,
  getColorToken,
  getColorVariable,
} from '@/shared/design-tokens';

// 색상 값 직접 사용
const blue50 = colorTokens.blue[50]; // '#0066FF'

// CSS 변수 이름 생성
const tokenName = getColorToken('blue', 50); // 'color-atomic-blue-50'
const cssVariable = getColorVariable('blue', 50); // '--color-atomic-blue-50'
```

### 4. React 컴포넌트에서 사용

```tsx
import { colorTokens } from '@/shared/design-tokens';

function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: colorTokens.blue[50],
        color: colorTokens.neutral[100],
      }}
    >
      내용
    </div>
  );
}
```

## 색상 카테고리

### Atomic Tokens (원자적 토큰)

- **common**: 공통 색상 (흰색, 검정색)
- **neutral**: 중립 회색 계열
- **coolNeutral**: 차가운 회색 계열
- **blue**: 파란색 계열
- **red**: 빨간색 계열
- **green**: 초록색 계열
- **orange**: 주황색 계열
- **redOrange**: 빨강-주황 계열
- **lime**: 라임색 계열
- **cyan**: 청록색 계열
- **lightBlue**: 하늘색 계열
- **violet**: 보라색 계열
- **purple**: 자주색 계열
- **pink**: 분홍색 계열
- **opacity**: 투명도 값

### Semantic Tokens (의미론적 토큰)

- **static**: 정적 색상 (흰색, 검정색)
- **primary**: 주요 색상
- **label**: 텍스트 레이블 색상
- **background**: 배경 색상
- **interaction**: 상호작용 색상
- **line**: 선/경계선 색상
- **status**: 상태 색상 (positive, cautionary, negative)
- **accentBackground**: 액센트 배경 색상
- **accentForeground**: 액센트 전경 색상
- **inverse**: 역전 색상
- **componentFill**: 컴포넌트 채우기 색상
- **componentMaterial**: 컴포넌트 재질 색상

### Elevation/Shadow Tokens

- **normal**: 기본 그림자 (1dp)
- **emphasize**: 강조 그림자 (3dp)
- **strong**: 강한 그림자 (6dp)
- **heavy**: 무거운 그림자 (12dp)

## 토큰 네이밍 규칙

- `color-atomic-{카테고리}-{값}`: 원자적 색상 토큰
- `color-global-{카테고리}-{값}`: 전역 색상 토큰
- `color-semantic-{카테고리}-{이름}`: 의미론적 색상 토큰
- `style-semantic-shadow-{이름}`: 의미론적 그림자 토큰

예:

- `color-atomic-blue-50`
- `color-global-neutral-100`
- `color-semantic-primary-normal`
- `style-semantic-shadow-normal`

## Semantic Token 사용 예시

```tsx
import { semanticColorTokens, shadowTokens } from '@/shared/design-tokens';

// Semantic color 사용
<div style={{ color: semanticColorTokens.label.normal }}>
  텍스트
</div>

// CSS 변수로 사용
<div className="text-[var(--color-semantic-primary-normal)]">
  주요 색상
</div>

// Shadow 사용
<div style={{ boxShadow: shadowTokens.normal.default }}>
  그림자 효과
</div>
```

## Typography Tokens (타이포그래피 토큰)

원티드 타이포그래피 시스템 - 7단계 위계, 18개 하위 위계 (Mobile 기준)

### 사용 방법

#### 1. CSS 변수로 사용

```css
.my-heading {
  font-size: var(--typography-heading-1-font-size);
  line-height: var(--typography-heading-1-line-height);
  letter-spacing: var(--typography-heading-1-letter-spacing);
}
```

#### 2. Tailwind CSS로 사용

```tsx
<div className="text-[var(--typography-heading-1-font-size)] leading-[var(--typography-heading-1-line-height)] tracking-[var(--typography-heading-1-letter-spacing)]">
  제목
</div>
```

#### 3. TypeScript 유틸리티 함수 사용

```tsx
import { getTypographyClass, getTypographyStyle } from '@/shared/design-tokens/typography-utils';

// CSS 클래스로 사용
<div className={getTypographyClass('heading-1')}>
  제목
</div>

// 인라인 스타일로 사용
<div style={getTypographyStyle('heading-1')}>
  제목
</div>
```

### 타이포그래피 위계

#### Display (표시)

- `display-1`: 56px / 72px / -0.0319em
- `display-2`: 40px / 52px / -0.0282em

#### Title (제목)

- `title-1`: 36px / 48px / -0.027em
- `title-2`: 28px / 38px / -0.0236em
- `title-3`: 24px / 32px / -0.023em

#### Heading (헤딩)

- `heading-1`: 22px / 30px / -0.0194em
- `heading-2`: 20px / 28px / -0.012em

#### Headline (헤드라인)

- `headline-1`: 18px / 26px / -0.002em
- `headline-2`: 17px / 24px / 0em

#### Body (본문)

- `body-1-normal`: 16px / 24px / 0.0057em
- `body-1-reading`: 16px / 26px / 0.0057em
- `body-2-normal`: 15px / 22px / 0.0096em
- `body-2-reading`: 15px / 24px / 0.0096em

#### Label (라벨)

- `label-1-normal`: 14px / 20px / 0.0145em
- `label-1-reading`: 14px / 22px / 0.0145em
- `label-2`: 13px / 18px / 0.0194em

#### Caption (캡션)

- `caption-1`: 12px / 16px / 0.0252em
- `caption-2`: 11px / 14px / 0.0311em

### 토큰 네이밍 규칙

- `--typography-{이름}-font-size`: 폰트 크기
- `--typography-{이름}-line-height`: 행간
- `--typography-{이름}-letter-spacing`: 자간

예:

- `--typography-heading-1-font-size`
- `--typography-body-1-normal-line-height`
- `--typography-label-2-letter-spacing`
