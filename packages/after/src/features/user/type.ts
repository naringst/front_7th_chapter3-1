export const UserRole = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const UserRoleValueLabelMap: Record<UserRoleType, string> = {
  [UserRole.ADMIN]: '관리자',
  [UserRole.MODERATOR]: '운영자',
  [UserRole.USER]: '사용자',
  [UserRole.GUEST]: '게스트',
} as const;
