import React, { useState, useEffect } from 'react';
import { Alert, Table, Modal } from '../components/organisms';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import '../styles/components.css';
import { Button } from '@/components/ui/button';
import { UserForm, type UserFormData } from '@/features/user/UserForm';
import {
  ArticleForm,
  type ArticleFormData,
} from '@/features/article/ArticleForm';

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
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '5px',
            }}
          >
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              사용자
            </button>
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

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '15px',
              }}
            >
              <div
                style={{
                  padding: '12px 15px',
                  background: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  전체
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1976d2',
                  }}
                >
                  {stats.total}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#e8f5e9',
                  border: '1px solid #81c784',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat1.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#388e3c',
                  }}
                >
                  {stats.stat1.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#fff3e0',
                  border: '1px solid #ffb74d',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat2.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#f57c00',
                  }}
                >
                  {stats.stat2.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#ffebee',
                  border: '1px solid #e57373',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat3.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#d32f2f',
                  }}
                >
                  {stats.stat3.value}
                </div>
              </div>

              <div
                style={{
                  padding: '12px 15px',
                  background: '#f5f5f5',
                  border: '1px solid #bdbdbd',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {stats.stat4.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#424242',
                  }}
                >
                  {stats.stat4.value}
                </div>
              </div>
            </div>

            <div
              style={{
                border: '1px solid #ddd',
                background: 'white',
                overflow: 'auto',
              }}
            >
              <Table
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

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setUserFormData({});
          setPostFormData({});
        }}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            {/* check */}
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
            {/* check */}
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === 'user' ? (
            <UserForm value={userFormData} onChange={setUserFormData} />
          ) : (
            <ArticleForm value={postFormData} onChange={setPostFormData} />
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setUserFormData({});
          setPostFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            {/* check */}
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
            {/* check */}
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
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
      </Modal>
    </div>
  );
};
