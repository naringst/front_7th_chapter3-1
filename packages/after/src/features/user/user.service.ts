import { UserRole, type UserRoleType } from './type';
import { BadgeType, type BadgeTypeType } from '../../components/ui/enum';

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
  checkBusinessRules: boolean,
) => {
  if (username.length < 3) {
    throw new Error('사용자명은 3자 이상이어야 합니다');
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error('영문, 숫자, 언더스코어만 사용 가능합니다');
  } else if (username.length > 20) {
    throw new Error('사용자명은 20자 이하여야 합니다');
  }

  // 🚨 도메인 특화 검증: 예약어 체크
  if (checkBusinessRules) {
    const reservedWords = ['admin', 'root', 'system', 'administrator'];
    if (reservedWords.includes(username.toLowerCase())) {
      throw new Error('예약된 사용자명입니다');
    }
    return true;
  }
  return true;
};

export const validateEmail = (
  email: string,
  checkBusinessRules: boolean = false,
) => {
  if (!email) {
    throw new Error('이메일을 입력해주세요');
  }

  // 기본 이메일 형식 검증
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('올바른 이메일 형식이 아닙니다');
  }

  // 비즈니스 규칙: User 엔티티의 이메일은 회사 도메인만
  if (checkBusinessRules) {
    if (!email.endsWith('@company.com') && !email.endsWith('@example.com')) {
      throw new Error(
        '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다',
      );
    }
  }

  return true;
};
