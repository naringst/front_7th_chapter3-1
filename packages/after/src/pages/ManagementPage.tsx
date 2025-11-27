import React, { useState, useEffect } from 'react';

import { DataTable } from '../shared/components';
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
import {
  UserForm,
  type UserFormData,
} from '@/features/user/components/UserForm';
import {
  ArticleForm,
  type ArticleFormData,
} from '@/features/article/components/articleForm/ArticleForm';
import { Alert } from '@/shared/ui/Alert';
import {
  type EntityType,
  type Entity,
  ManagementService,
  useAlert,
  getStats,
  getTableColumns,
  entityToFormData,
  getSuccessMessage,
  getEntityLabel,
} from '@/features/management';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);

  const [userFormData, setUserFormData] = useState<UserFormData>({});
  const [postFormData, setPostFormData] = useState<ArticleFormData>({});

  const {
    alertState,
    showSuccessAlert,
    showErrorAlert,
    hideSuccessAlert,
    hideErrorAlert,
    resetAlerts,
  } = useAlert();

  useEffect(() => {
    loadData();
    resetFormData();
    resetAlerts();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType]);

  const resetFormData = () => {
    setUserFormData({});
    setPostFormData({});
  };

  const loadData = async () => {
    try {
      const result = await ManagementService.loadData(entityType);
      setData(result);
    } catch (error: any) {
      showErrorAlert('데이터를 불러오는데 실패했습니다');
    }
  };

  const handleCreate = async () => {
    try {
      const formData = entityType === 'user' ? userFormData : postFormData;
      await ManagementService.createEntity(entityType, formData);

      await loadData();
      setIsCreateModalOpen(false);
      resetFormData();
      showSuccessAlert(getSuccessMessage(entityType, 'create'));
    } catch (error: any) {
      showErrorAlert(error.message || '생성에 실패했습니다');
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    const formData = entityToFormData(item, entityType);

    if (entityType === 'user') {
      setUserFormData(formData as UserFormData);
    } else {
      setPostFormData(formData as ArticleFormData);
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      const formData = entityType === 'user' ? userFormData : postFormData;
      await ManagementService.updateEntity(
        entityType,
        selectedItem.id,
        formData,
      );

      await loadData();
      setIsEditModalOpen(false);
      resetFormData();
      setSelectedItem(null);
      showSuccessAlert(getSuccessMessage(entityType, 'update'));
    } catch (error: any) {
      showErrorAlert(error.message || '수정에 실패했습니다');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await ManagementService.deleteEntity(entityType, id);
      await loadData();
      showSuccessAlert(getSuccessMessage(entityType, 'delete'));
    } catch (error: any) {
      showErrorAlert(error.message || '삭제에 실패했습니다');
    }
  };

  const handleStatusAction = async (
    id: number,
    action: 'publish' | 'archive' | 'restore',
  ) => {
    if (entityType !== 'post') return;

    try {
      await ManagementService.changePostStatus(id, action);
      await loadData();
      showSuccessAlert(getSuccessMessage(entityType, action));
    } catch (error: any) {
      showErrorAlert(error.message || '작업에 실패했습니다');
    }
  };

  const stats = getStats(entityType, data);

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

            {alertState.showSuccess && (
              <div style={{ marginBottom: '10px' }}>
                <Alert
                  variant="success"
                  title="성공"
                  onClose={hideSuccessAlert}
                >
                  {alertState.successMessage}
                </Alert>
              </div>
            )}

            {alertState.showError && (
              <div style={{ marginBottom: '10px' }}>
                <Alert variant="error" title="오류" onClose={hideErrorAlert}>
                  {alertState.errorMessage}
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
                columns={getTableColumns(entityType)}
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
            resetFormData();
          }
        }}
      >
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>새 {getEntityLabel(entityType)} 만들기</DialogTitle>
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
                resetFormData();
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
            resetFormData();
            setSelectedItem(null);
          }
        }}
      >
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>{getEntityLabel(entityType)} 수정</DialogTitle>
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
                resetFormData();
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
