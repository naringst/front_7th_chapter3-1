import React from 'react';
import { FormInput, FormSelect } from '@/components/molecules';

export interface UserFormData {
  username?: string;
  email?: string;
  role?: string;
  status?: string;
}

interface UserFormProps {
  value: UserFormData;
  onChange: (value: UserFormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ value, onChange }) => {
  const handleFieldChange =
    (field: keyof UserFormData) => (newValue: string) => {
      onChange({ ...value, [field]: newValue });
    };

  return (
    <>
      <FormInput
        name="username"
        value={value.username || ''}
        onChange={handleFieldChange('username')}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
        width="full"
        fieldType="username"
      />
      <FormInput
        name="email"
        value={value.email || ''}
        onChange={handleFieldChange('email')}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
        width="full"
        fieldType="email"
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <FormSelect
          name="role"
          value={value.role || 'user'}
          onChange={handleFieldChange('role')}
          options={[
            { value: 'user', label: '사용자' },
            { value: 'moderator', label: '운영자' },
            { value: 'admin', label: '관리자' },
          ]}
          label="역할"
          size="md"
        />
        <FormSelect
          name="status"
          value={value.status || 'active'}
          onChange={handleFieldChange('status')}
          options={[
            { value: 'active', label: '활성' },
            { value: 'inactive', label: '비활성' },
            { value: 'suspended', label: '정지' },
          ]}
          label="상태"
          size="md"
        />
      </div>
    </>
  );
};
