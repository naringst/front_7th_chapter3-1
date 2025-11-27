export const ArticleStatus = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

export type ArticleStatusType =
  (typeof ArticleStatus)[keyof typeof ArticleStatus];

export const articleStatusValueMap: Record<ArticleStatusType, string> = {
  [ArticleStatus.PUBLISHED]: '게시됨',
  [ArticleStatus.REJECTED]: '거부됨',
  [ArticleStatus.DRAFT]: '임시저장',
  [ArticleStatus.ARCHIVED]: '보관됨',
  [ArticleStatus.PENDING]: '대기중',
};
