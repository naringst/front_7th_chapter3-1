import React, { useState, useEffect } from 'react';

import { DataTable } from '../shared/components';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import '../styles/components.css';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/ui/dialog';
import { CardBase, CardContent } from '@/shared/ui/card';
import { UserForm, type UserFormData } from '@/features/user/UserForm';
import {
  ArticleForm,
  type ArticleFormData,
} from '@/features/article/components/articleForm/ArticleForm';
import { Alert } from '@/shared/ui/Alert';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [userFormData, setUserFormData] = useState<UserFormData>({});
  const [postFormData, setPostFormData] = useState<ArticleFormData>({});

  useEffect(() => {
    loadData();
    setUserFormData({});
    setPostFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: userFormData.username!,
          email: userFormData.email!,
          role: (userFormData.role || 'user') as 'admin' | 'moderator' | 'user',
          status: (userFormData.status || 'active') as
            | 'active'
            | 'inactive'
            | 'suspended',
        });
      } else {
        await postService.create({
          title: postFormData.title!,
          content: postFormData.content || '',
          author: postFormData.author!,
          category: postFormData.category!,
          status: (postFormData.status || 'draft') as
            | 'draft'
            | 'published'
            | 'archived',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setUserFormData({});
      setPostFormData({});
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`,
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      setUserFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setPostFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, {
          username: userFormData.username,
          email: userFormData.email,
          role: userFormData.role as 'admin' | 'moderator' | 'user' | undefined,
          status: userFormData.status as
            | 'active'
            | 'inactive'
            | 'suspended'
            | undefined,
        });
      } else {
        await postService.update(selectedItem.id, {
          title: postFormData.title,
          content: postFormData.content,
          author: postFormData.author,
          category: postFormData.category,
          status: postFormData.status as
            | 'draft'
            | 'published'
            | 'archived'
            | undefined,
        });
      }

      await loadData();
      setIsEditModalOpen(false);
      setUserFormData({});
      setPostFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`,
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: 'publish' | 'archive' | 'restore',
  ) => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
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
    } else {
      const posts = data as Post[];
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
  };

  // 🚨 Table 컴포넌트에 로직을 위임하여 간소화
  const renderTableColumns = () => {
    if (entityType === 'user') {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'username', header: '사용자명', width: '150px' },
        { key: 'email', header: '이메일' },
        { key: 'role', header: '역할', width: '120px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'createdAt', header: '생성일', width: '120px' },
        { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
        { key: 'actions', header: '관리', width: '200px' },
      ];
    } else {
      return [
        { key: 'id', header: 'ID', width: '60px' },
        { key: 'title', header: '제목' },
        { key: 'author', header: '작성자', width: '120px' },
        { key: 'category', header: '카테고리', width: '140px' },
        { key: 'status', header: '상태', width: '120px' },
        { key: 'views', header: '조회수', width: '100px' },
        { key: 'createdAt', header: '작성일', width: '120px' },
        { key: 'actions', header: '관리', width: '250px' },
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-[var(--color-semantic-background-normal-normal)] transition-colors">
      <div className="mx-auto max-w-[1200px] p-5">
        <div className="mb-5">
          <h1 className="mb-1 text-2xl font-bold text-[var(--color-semantic-label-strong)]">
            관리 시스템
          </h1>
          <p className="text-sm text-[var(--color-semantic-label-assistive)]">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          className="rounded-lg border bg-[var(--color-semantic-background-elevated-normal)] p-2.5 transition-colors"
          style={{ borderColor: 'var(--color-semantic-line-solid-normal)' }}
        >
          <div
            className="mb-4 border-b pb-1"
            style={{ borderColor: 'var(--color-semantic-line-normal-neutral)' }}
          >
            <Button
              variant={entityType === 'post' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setEntityType('post')}
              className="mr-1"
            >
              게시글
            </Button>
            <Button
              variant={entityType === 'user' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setEntityType('user')}
            >
              사용자
            </Button>
          </div>

          <div>
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
              {/* check */}
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert
                  variant="success"
                  title="성공"
                  onClose={() => setShowSuccessAlert(false)}
                >
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert
                  variant="error"
                  title="오류"
                  onClose={() => setShowErrorAlert(false)}
                >
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
              <CardBase
                className="!rounded !border !p-3 !py-3 !gap-0 transition-colors bg-[var(--color-atomic-lightBlue-99)] shadow-none"
                style={{ borderColor: 'var(--color-atomic-lightBlue-80)' }}
              >
                <CardContent className="!p-0">
                  <div className="mb-1 text-xs text-[var(--color-semantic-label-alternative)]">
                    전체
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-semantic-accent-foreground-lightBlue)]">
                    {stats.total}
                  </div>
                </CardContent>
              </CardBase>

              <CardBase
                className="!rounded !border !p-3 !py-3 !gap-0 transition-colors bg-[var(--color-atomic-green-99)] shadow-none"
                style={{ borderColor: 'var(--color-atomic-green-80)' }}
              >
                <CardContent className="!p-0">
                  <div className="mb-1 text-xs text-[var(--color-semantic-label-alternative)]">
                    {stats.stat1.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-semantic-accent-foreground-green)]">
                    {stats.stat1.value}
                  </div>
                </CardContent>
              </CardBase>

              <CardBase
                className="!rounded !border !p-3 !py-3 !gap-0 transition-colors bg-[var(--color-atomic-orange-99)] shadow-none"
                style={{ borderColor: 'var(--color-atomic-orange-80)' }}
              >
                <CardContent className="!p-0">
                  <div className="mb-1 text-xs text-[var(--color-semantic-label-alternative)]">
                    {stats.stat2.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-semantic-accent-foreground-orange)]">
                    {stats.stat2.value}
                  </div>
                </CardContent>
              </CardBase>

              <CardBase
                className="!rounded !border !p-3 !py-3 !gap-0 transition-colors bg-[var(--color-atomic-red-99)] shadow-none"
                style={{ borderColor: 'var(--color-atomic-red-80)' }}
              >
                <CardContent className="!p-0">
                  <div className="mb-1 text-xs text-[var(--color-semantic-label-alternative)]">
                    {stats.stat3.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-semantic-accent-foreground-red)]">
                    {stats.stat3.value}
                  </div>
                </CardContent>
              </CardBase>

              <CardBase
                className="!rounded !border !p-3 !py-3 !gap-0 transition-colors bg-[var(--color-semantic-background-normal-alternative)] shadow-none"
                style={{
                  borderColor: 'var(--color-semantic-line-solid-neutral)',
                }}
              >
                <CardContent className="!p-0">
                  <div className="mb-1 text-xs text-[var(--color-semantic-label-alternative)]">
                    {stats.stat4.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--color-semantic-label-normal)]">
                    {stats.stat4.value}
                  </div>
                </CardContent>
              </CardBase>
            </div>

            <div
              className="overflow-auto rounded border bg-[var(--color-semantic-background-elevated-normal)] transition-colors"
              style={{ borderColor: 'var(--color-semantic-line-solid-normal)' }}
            >
              <DataTable
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, 'publish')}
                onArchive={(id) => handleStatusAction(id, 'archive')}
                onRestore={(id) => handleStatusAction(id, 'restore')}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) {
            setUserFormData({});
            setPostFormData({});
          }
        }}
      >
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>
              새 {entityType === 'user' ? '사용자' : '게시글'} 만들기
            </DialogTitle>
          </DialogHeader>
          <div>
            {entityType === 'user' ? (
              <UserForm value={userFormData} onChange={setUserFormData} />
            ) : (
              <ArticleForm value={postFormData} onChange={setPostFormData} />
            )}
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsCreateModalOpen(false);
                setUserFormData({});
                setPostFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) {
            setUserFormData({});
            setPostFormData({});
            setSelectedItem(null);
          }
        }}
      >
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>
              {entityType === 'user' ? '사용자' : '게시글'} 수정
            </DialogTitle>
          </DialogHeader>
          <div>
            {selectedItem && (
              <Alert variant="info">
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' &&
                  ` | 조회수: ${(selectedItem as Post).views}`}
              </Alert>
            )}

            {entityType === 'user' ? (
              <UserForm value={userFormData} onChange={setUserFormData} />
            ) : (
              <ArticleForm value={postFormData} onChange={setPostFormData} />
            )}
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setUserFormData({});
                setPostFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
