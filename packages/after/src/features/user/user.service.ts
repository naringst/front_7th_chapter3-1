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
