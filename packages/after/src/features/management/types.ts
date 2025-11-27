import type { User } from '../../services/userService';
import type { Post } from '../../services/postService';
import type { UserFormData } from '../user/components/UserForm';
import type { ArticleFormData } from '../article/components/articleForm/ArticleForm';

export type EntityType = 'user' | 'post';
export type Entity = User | Post;

export interface StatsData {
  total: number;
  stat1: { label: string; value: number; color?: string };
  stat2: { label: string; value: number; color?: string };
  stat3: { label: string; value: number; color?: string };
  stat4: { label: string; value: number; color?: string };
}

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

export interface ManagementState {
  entityType: EntityType;
  data: Entity[];
  selectedItem: Entity | null;
  userFormData: UserFormData;
  postFormData: ArticleFormData;
}

