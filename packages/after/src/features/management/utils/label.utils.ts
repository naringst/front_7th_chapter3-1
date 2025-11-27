import type { EntityType } from '../types';

/**
 * 엔티티 타입에 따른 라벨 변환 유틸리티
 */
export function getEntityLabel(entityType: EntityType, plural: boolean = false): string {
  if (entityType === 'user') {
    return plural ? '사용자들' : '사용자';
  } else {
    return plural ? '게시글들' : '게시글';
  }
}

export function getStatusActionLabel(
  action: 'publish' | 'archive' | 'restore',
): string {
  const labels = {
    publish: '게시',
    archive: '보관',
    restore: '복원',
  };
  return labels[action];
}

export function getSuccessMessage(
  entityType: EntityType,
  action: 'create' | 'update' | 'delete' | 'publish' | 'archive' | 'restore',
): string {
  const entityLabel = getEntityLabel(entityType);
  const actionLabels = {
    create: '생성',
    update: '수정',
    delete: '삭제',
    publish: '게시',
    archive: '보관',
    restore: '복원',
  };

  if (action === 'delete') {
    return '삭제되었습니다';
  }

  if (['publish', 'archive', 'restore'].includes(action)) {
    return `${actionLabels[action]}되었습니다`;
  }

  return `${entityLabel}가 ${actionLabels[action]}되었습니다`;
}

