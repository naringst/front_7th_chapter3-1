import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table as UITable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import { cn } from '../lib/utils';
import { getTypeByUserRole } from '@/features/user/user.service';
import { UserRoleValueLabelMap, type UserRoleType } from '@/features/user/type';
import { getArticleTypeFromStatus } from '@/features/article/article.service';
import {
  articleStatusValueMap,
  type ArticleStatusType,
} from '@/features/article/enum';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface DataTableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // 🚨 도메인 관심사 추가
  entityType?: 'user' | 'post';
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data = [],
  striped = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return newDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === 'user') {
      if (columnKey === 'role') {
        return (
          <Badge type={getTypeByUserRole(value as UserRoleType)} showIcon>
            {UserRoleValueLabelMap[value as UserRoleType]}
          </Badge>
        );
      }
      if (columnKey === 'status') {
        // User status를 Badge status로 변환
        const badgeStatus =
          value === 'active'
            ? 'published'
            : value === 'inactive'
            ? 'draft'
            : 'rejected';
        return (
          <Badge type={getArticleTypeFromStatus(badgeStatus)} showIcon>
            {articleStatusValueMap[badgeStatus as ArticleStatusType]}
          </Badge>
        );
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const type =
          value === 'development'
            ? 'primary'
            : value === 'design'
            ? 'info'
            : value === 'accessibility'
            ? 'danger'
            : 'secondary';
        return (
          <Badge type={type} pill>
            {value}
          </Badge>
        );
      }
      if (columnKey === 'status') {
        return (
          <Badge type={getArticleTypeFromStatus(value)} showIcon>
            {articleStatusValueMap[value as ArticleStatusType]}
          </Badge>
        );
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
        </div>
      )}

      <UITable>
        <TableHeader>
          <TableRow>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(
                  sortable &&
                    'cursor-pointer hover:bg-[var(--color-component-fill-normal)]',
                )}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span className="text-[var(--color-semantic-label-alternative)]">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(
                onRowClick && 'cursor-pointer',
                striped &&
                  rowIndex % 2 === 0 &&
                  'bg-[var(--color-semantic-background-normal-alternative)]',
                hover && 'hover:bg-[var(--color-component-fill-normal)]',
              )}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </UITable>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="px-3 py-1.5 text-sm text-[var(--color-semantic-label-alternative)]">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
