import { userService } from '../../services/userService';
import { postService } from '../../services/postService';
import type { User } from '../../services/userService';
import type { Post } from '../../services/postService';
import type { UserFormData } from '../user/components/UserForm';
import type { ArticleFormData } from '../article/components/articleForm/ArticleForm';
import type { EntityType, Entity } from './types';
import {
  userFormDataToCreatePayload,
  postFormDataToCreatePayload,
  userFormDataToUpdatePayload,
  postFormDataToUpdatePayload,
} from './utils/form.utils';

/**
 * Management 비즈니스 로직 서비스
 */
export class ManagementService {
  /**
   * 엔티티 타입에 따라 데이터 로드
   */
  static async loadData(entityType: EntityType): Promise<Entity[]> {
    if (entityType === 'user') {
      return await userService.getAll();
    } else {
      return await postService.getAll();
    }
  }

  /**
   * 엔티티 생성
   */
  static async createEntity(
    entityType: EntityType,
    formData: UserFormData | ArticleFormData,
  ): Promise<void> {
    if (entityType === 'user') {
      await userService.create(userFormDataToCreatePayload(formData as UserFormData));
    } else {
      await postService.create(postFormDataToCreatePayload(formData as ArticleFormData));
    }
  }

  /**
   * 엔티티 수정
   */
  static async updateEntity(
    entityType: EntityType,
    id: number,
    formData: UserFormData | ArticleFormData,
  ): Promise<void> {
    if (entityType === 'user') {
      await userService.update(id, userFormDataToUpdatePayload(formData as UserFormData));
    } else {
      await postService.update(id, postFormDataToUpdatePayload(formData as ArticleFormData));
    }
  }

  /**
   * 엔티티 삭제
   */
  static async deleteEntity(entityType: EntityType, id: number): Promise<void> {
    if (entityType === 'user') {
      await userService.delete(id);
    } else {
      await postService.delete(id);
    }
  }

  /**
   * 게시글 상태 변경 (게시, 보관, 복원)
   */
  static async changePostStatus(
    id: number,
    action: 'publish' | 'archive' | 'restore',
  ): Promise<void> {
    if (action === 'publish') {
      await postService.publish(id);
    } else if (action === 'archive') {
      await postService.archive(id);
    } else if (action === 'restore') {
      await postService.restore(id);
    }
  }
}

