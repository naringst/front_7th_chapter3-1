import { UserRole, type UserRoleType } from './type';
import { BadgeType, type BadgeTypeType } from '../../shared/ui/enum';

export const getTypeByUserRole = (userRole: UserRoleType): BadgeTypeType => {
  let actualType: BadgeTypeType;

  switch (userRole) {
    case UserRole.ADMIN:
      actualType = BadgeType.DANGER;

      break;
    case UserRole.MODERATOR:
      actualType = BadgeType.WARNING;

      break;
    case UserRole.USER:
      actualType = BadgeType.PRIMARY;

      break;
    case UserRole.GUEST:
      actualType = BadgeType.SECONDARY;

      break;
  }

  return actualType;
};

export const validateUserName = (
  username: string,
  checkBusinessRules: boolean = false,
): string | null => {
  if (!username) {
    return null; // 빈 값은 검증하지 않음 (required는 별도 처리)
  }

  if (username.length < 3) {
    return '사용자명은 3자 이상이어야 합니다';
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return '영문, 숫자, 언더스코어만 사용 가능합니다';
  }

  if (username.length > 20) {
    return '사용자명은 20자 이하여야 합니다';
  }

  // 도메인 특화 검증: 예약어 체크
  if (checkBusinessRules) {
    const reservedWords = ['admin', 'root', 'system', 'administrator'];
    if (reservedWords.includes(username.toLowerCase())) {
      return '예약된 사용자명입니다';
    }
  }

  return null; // 검증 통과
};

export const validateEmail = (
  email: string,
  checkBusinessRules: boolean = false,
): string | null => {
  if (!email) {
    return null; // 빈 값은 검증하지 않음 (required는 별도 처리)
  }

  // 기본 이메일 형식 검증
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return '올바른 이메일 형식이 아닙니다';
  }

  // 비즈니스 규칙: User 엔티티의 이메일은 회사 도메인만
  if (checkBusinessRules) {
    if (!email.endsWith('@company.com') && !email.endsWith('@example.com')) {
      return '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다';
    }
  }

  return null; // 검증 통과
};
