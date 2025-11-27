import type { User } from '../../../services/userService';
import type { Post } from '../../../services/postService';
import type { UserFormData } from '../../user/components/UserForm';
import type { ArticleFormData } from '../../article/components/articleForm/ArticleForm';
import type { EntityType, Entity } from '../types';

/**
 * Entity를 FormData로 변환
 */
export function entityToUserFormData(user: User): UserFormData {
  return {
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

export function entityToPostFormData(post: Post): ArticleFormData {
  return {
    title: post.title,
    content: post.content,
    author: post.author,
    category: post.category,
    status: post.status,
  };
}

export function entityToFormData(
  entity: Entity,
  entityType: EntityType,
): UserFormData | ArticleFormData {
  if (entityType === 'user') {
    return entityToUserFormData(entity as User);
  } else {
    return entityToPostFormData(entity as Post);
  }
}

/**
 * FormData를 생성 payload로 변환
 */
export function userFormDataToCreatePayload(
  formData: UserFormData,
): {
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
} {
  return {
    username: formData.username!,
    email: formData.email!,
    role: (formData.role || 'user') as 'admin' | 'moderator' | 'user',
    status: (formData.status || 'active') as 'active' | 'inactive' | 'suspended',
  };
}

export function postFormDataToCreatePayload(
  formData: ArticleFormData,
): {
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
} {
  return {
    title: formData.title!,
    content: formData.content || '',
    author: formData.author!,
    category: formData.category!,
    status: (formData.status || 'draft') as 'draft' | 'published' | 'archived',
  };
}

/**
 * FormData를 수정 payload로 변환
 */
export function userFormDataToUpdatePayload(formData: UserFormData): {
  username?: string;
  email?: string;
  role?: 'admin' | 'moderator' | 'user';
  status?: 'active' | 'inactive' | 'suspended';
} {
  return {
    username: formData.username,
    email: formData.email,
    role: formData.role as 'admin' | 'moderator' | 'user' | undefined,
    status: formData.status as 'active' | 'inactive' | 'suspended' | undefined,
  };
}

export function postFormDataToUpdatePayload(formData: ArticleFormData): {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  status?: 'draft' | 'published' | 'archived';
} {
  return {
    title: formData.title,
    content: formData.content,
    author: formData.author,
    category: formData.category,
    status: formData.status as 'draft' | 'published' | 'archived' | undefined,
  };
}

