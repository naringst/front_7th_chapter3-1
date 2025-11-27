import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { cn } from '@/shared/lib/utils';
import { validatePostTitle } from '../../article.service';
import { FormSelect } from '@/features/common/components/form/FormSelect';

export interface ArticleFormData {
  title?: string;
  author?: string;
  category?: string;
  content?: string;
  status?: string;
}

interface ArticleFormProps {
  value: ArticleFormData;
  onChange: (value: ArticleFormData) => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  value,
  onChange,
}) => {
  const form = useForm<ArticleFormData>({
    mode: 'onBlur', // blur 시 검증
    defaultValues: {
      title: value.title || '',
      author: value.author || '',
      category: value.category || '',
      content: value.content || '',
      status: value.status || '',
    },
  });

  const isInternalUpdate = useRef(false);

  // value가 변경되면 form 값 업데이트 (외부에서 변경된 경우만)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      form.reset({
        title: value.title || '',
        author: value.author || '',
        category: value.category || '',
        content: value.content || '',
        status: value.status || '',
      });
    }
    isInternalUpdate.current = false;
  }, [value, form]);

  // 필드 변경 핸들러
  const handleFieldChange =
    (fieldName: keyof ArticleFormData) => (newValue: string) => {
      isInternalUpdate.current = true;
      form.setValue(fieldName, newValue as any, { shouldValidate: true });
      const updatedValue = { ...form.getValues(), [fieldName]: newValue };
      onChange(updatedValue as ArticleFormData);
    };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="title"
        rules={{
          required: '제목을 입력해주세요',
          validate: (value: string | undefined) => {
            if (!value) return true; // required는 별도 처리
            const error = validatePostTitle(value, false);
            return error || true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              제목
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('title')(e.target.value);
                }}
                onBlur={field.onBlur}
                placeholder="게시글 제목을 입력하세요"
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="author"
          rules={{
            required: '작성자를 입력해주세요',
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                작성자
                <span className="text-destructive ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange('author')(e.target.value);
                  }}
                  onBlur={field.onBlur}
                  placeholder="작성자명"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              value={field.value || ''}
              onChange={(value) => {
                field.onChange(value);
                handleFieldChange('category')(value);
              }}
              onBlur={field.onBlur}
              options={[
                { value: 'development', label: 'Development' },
                { value: 'design', label: 'Design' },
                { value: 'accessibility', label: 'Accessibility' },
              ]}
              label="카테고리"
              placeholder="카테고리 선택"
            />
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>내용</FormLabel>
            <FormControl>
              <textarea
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('content')(e.target.value);
                }}
                onBlur={field.onBlur}
                placeholder="게시글 내용을 입력하세요"
                rows={6}
                className={cn(
                  'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none',
                  'placeholder:text-muted-foreground',
                  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                  'resize-y',
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};
