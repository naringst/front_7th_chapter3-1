import { ArticleStatus, type ArticleStatusType } from './enum';
import { BadgeType, type BadgeTypeType } from '../../components/ui/enum';

export const getArticleTypeFromStatus = (
  status: ArticleStatusType,
): BadgeTypeType => {
  let actualType: BadgeTypeType;

  switch (status) {
    case ArticleStatus.PUBLISHED:
      actualType = BadgeType.SUCCESS;

      break;
    case ArticleStatus.DRAFT:
      actualType = BadgeType.WARNING;

      break;
    case ArticleStatus.ARCHIVED:
      actualType = BadgeType.SECONDARY;

      break;
    case ArticleStatus.PENDING:
      actualType = BadgeType.INFO;

      break;
    case ArticleStatus.REJECTED:
      actualType = BadgeType.DANGER;

      break;
  }
  return actualType;
};
