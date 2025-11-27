import React from 'react';
import { FormInput, FormSelect, FormTextarea } from '@/components/molecules';

export interface ArticleFormData {
  title?: string;
  author?: string;
  category?: string;
  content?: string;
  status?: string;
}

interface PostFormProps {
  value: ArticleFormData;
  onChange: (value: ArticleFormData) => void;
}

export const ArticleForm: React.FC<PostFormProps> = ({ value, onChange }) => {
  const handleFieldChange =
    (field: keyof ArticleFormData) => (newValue: string) => {
      onChange({ ...value, [field]: newValue });
    };

  return (
    <>
      <FormInput
        name="title"
        value={value.title || ''}
        onChange={handleFieldChange('title')}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
        width="full"
        fieldType="postTitle"
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        <FormInput
          name="author"
          value={value.author || ''}
          onChange={handleFieldChange('author')}
          label="작성자"
          placeholder="작성자명"
          required
          width="full"
        />
        <FormSelect
          name="category"
          value={value.category || ''}
          onChange={handleFieldChange('category')}
          options={[
            { value: 'development', label: 'Development' },
            { value: 'design', label: 'Design' },
            { value: 'accessibility', label: 'Accessibility' },
          ]}
          label="카테고리"
          placeholder="카테고리 선택"
          size="md"
        />
      </div>
      <FormTextarea
        name="content"
        value={value.content || ''}
        onChange={handleFieldChange('content')}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </>
  );
};
