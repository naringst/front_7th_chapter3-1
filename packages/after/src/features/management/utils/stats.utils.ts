import type { User } from '../../../services/userService';
import type { Post } from '../../../services/postService';
import type { EntityType, StatsData } from '../types';

/**
 * 통계 데이터 계산 유틸리티
 */
export function calculateUserStats(users: User[]): StatsData {
  return {
    total: users.length,
    stat1: {
      label: '활성',
      value: users.filter((u) => u.status === 'active').length,
      color: '#2e7d32',
    },
    stat2: {
      label: '비활성',
      value: users.filter((u) => u.status === 'inactive').length,
      color: '#ed6c02',
    },
    stat3: {
      label: '정지',
      value: users.filter((u) => u.status === 'suspended').length,
      color: '#d32f2f',
    },
    stat4: {
      label: '관리자',
      value: users.filter((u) => u.role === 'admin').length,
      color: '#1976d2',
    },
  };
}

export function calculatePostStats(posts: Post[]): StatsData {
  return {
    total: posts.length,
    stat1: {
      label: '게시됨',
      value: posts.filter((p) => p.status === 'published').length,
      color: '#2e7d32',
    },
    stat2: {
      label: '임시저장',
      value: posts.filter((p) => p.status === 'draft').length,
      color: '#ed6c02',
    },
    stat3: {
      label: '보관됨',
      value: posts.filter((p) => p.status === 'archived').length,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    stat4: {
      label: '총 조회수',
      value: posts.reduce((sum, p) => sum + p.views, 0),
      color: '#1976d2',
    },
  };
}

export function getStats(entityType: EntityType, data: (User | Post)[]): StatsData {
  if (entityType === 'user') {
    return calculateUserStats(data as User[]);
  } else {
    return calculatePostStats(data as Post[]);
  }
}

