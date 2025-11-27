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

export const validatePostTitle = (
  title: string,
  checkBusinessRules: boolean = false,
) => {
  if (!title) {
    throw new Error('제목을 입력해주세요');
  }

  if (title.length < 5) {
    throw new Error('제목은 5자 이상이어야 합니다');
  }

  if (title.length > 100) {
    throw new Error('제목은 100자 이하여야 합니다');
  }

  // 비즈니스 규칙: 금칙어 체크
  if (checkBusinessRules) {
    const bannedWords = ['광고', '스팸', '홍보'];
    const hasBannedWord = bannedWords.some((word) => title.includes(word));
    if (hasBannedWord) {
      throw new Error('제목에 금지된 단어가 포함되어 있습니다');
    }
  }

  return true;
};
