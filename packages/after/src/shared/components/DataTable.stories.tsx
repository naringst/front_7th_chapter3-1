import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUsers = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-20',
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    username: 'bob_johnson',
    email: 'bob@example.com',
    role: 'moderator',
    status: 'inactive',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-15',
  },
];

const samplePosts = [
  {
    id: 1,
    title: 'React 19 새로운 기능',
    author: '이영희',
    category: 'development',
    status: 'published',
    views: 856,
    createdAt: '2024-01-18',
  },
  {
    id: 2,
    title: 'TailwindCSS vs CSS-in-JS',
    author: '박민수',
    category: 'design',
    status: 'draft',
    views: 432,
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    title: '웹 접근성 체크리스트',
    author: '김철수',
    category: 'accessibility',
    status: 'published',
    views: 2341,
    createdAt: '2024-01-22',
  },
];

export const UserTable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'username', header: '사용자명', width: '150px' },
      { key: 'email', header: '이메일' },
      { key: 'role', header: '역할', width: '120px' },
      { key: 'status', header: '상태', width: '120px' },
      { key: 'createdAt', header: '생성일', width: '120px' },
      { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
      { key: 'actions', header: '관리', width: '200px' },
    ],
    data: sampleUsers,
    entityType: 'user',
    striped: true,
    hover: true,
    onEdit: (item) => console.log('Edit:', item),
    onDelete: (id) => console.log('Delete:', id),
  },
};

export const PostTable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'title', header: '제목' },
      { key: 'author', header: '작성자', width: '120px' },
      { key: 'category', header: '카테고리', width: '140px' },
      { key: 'status', header: '상태', width: '120px' },
      { key: 'views', header: '조회수', width: '100px' },
      { key: 'createdAt', header: '작성일', width: '120px' },
      { key: 'actions', header: '관리', width: '250px' },
    ],
    data: samplePosts,
    entityType: 'post',
    striped: true,
    hover: true,
    onEdit: (item) => console.log('Edit:', item),
    onDelete: (id) => console.log('Delete:', id),
    onPublish: (id) => console.log('Publish:', id),
    onArchive: (id) => console.log('Archive:', id),
    onRestore: (id) => console.log('Restore:', id),
  },
};

export const WithSearch: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'username', header: '사용자명', width: '150px' },
      { key: 'email', header: '이메일' },
      { key: 'role', header: '역할', width: '120px' },
    ],
    data: sampleUsers,
    searchable: true,
    striped: true,
    hover: true,
  },
};

export const WithSorting: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px', sortable: true },
      { key: 'username', header: '사용자명', width: '150px', sortable: true },
      { key: 'email', header: '이메일', sortable: true },
      { key: 'role', header: '역할', width: '120px' },
    ],
    data: sampleUsers,
    sortable: true,
    striped: true,
    hover: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', width: '60px' },
      { key: 'username', header: '사용자명', width: '150px' },
      { key: 'email', header: '이메일' },
      { key: 'role', header: '역할', width: '120px' },
    ],
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      username: `user_${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'admin' : i % 3 === 1 ? 'moderator' : 'user',
    })),
    pageSize: 5,
    striped: true,
    hover: true,
  },
};
