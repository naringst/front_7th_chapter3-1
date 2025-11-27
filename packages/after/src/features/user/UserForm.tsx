import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validateUserName, validateEmail } from './user.service';
import { FormSelect } from '../common/components/form/FormSelect';

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
  const form = useForm<UserFormData>({
    mode: 'onBlur', // blur 시 검증
    defaultValues: {
      username: value.username || '',
      email: value.email || '',
      role: value.role || 'user',
      status: value.status || 'active',
    },
  });

  const isInternalUpdate = useRef(false);

  // value가 변경되면 form 값 업데이트 (외부에서 변경된 경우만)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      form.reset({
        username: value.username || '',
        email: value.email || '',
        role: value.role || 'user',
        status: value.status || 'active',
      });
    }
    isInternalUpdate.current = false;
  }, [value, form]);

  // 필드 변경 핸들러
  const handleFieldChange =
    (fieldName: keyof UserFormData) => (newValue: string) => {
      isInternalUpdate.current = true;
      form.setValue(fieldName, newValue as any, { shouldValidate: true });
      const updatedValue = { ...form.getValues(), [fieldName]: newValue };
      onChange(updatedValue as UserFormData);
    };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        rules={{
          required: '사용자명을 입력해주세요',
          validate: (value: string | undefined) => {
            if (!value) return true; // required는 별도 처리
            const error = validateUserName(value, false);
            return error || true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              사용자명
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('username')(e.target.value);
                }}
                onBlur={field.onBlur}
                placeholder="사용자명을 입력하세요"
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        rules={{
          required: '이메일을 입력해주세요',
          validate: (value: string | undefined) => {
            if (!value) return true; // required는 별도 처리
            const error = validateEmail(value, false);
            return error || true;
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              이메일
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  handleFieldChange('email')(e.target.value);
                }}
                onBlur={field.onBlur}
                placeholder="이메일을 입력하세요"
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
          name="role"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              value={field.value || 'user'}
              onChange={handleFieldChange('role')}
              options={[
                { value: 'user', label: '사용자' },
                { value: 'moderator', label: '운영자' },
                { value: 'admin', label: '관리자' },
              ]}
              label="역할"
            />
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormSelect
              name={field.name}
              value={field.value || 'active'}
              onChange={handleFieldChange('status')}
              options={[
                { value: 'active', label: '활성' },
                { value: 'inactive', label: '비활성' },
                { value: 'suspended', label: '정지' },
              ]}
              label="상태"
            />
          )}
        />
      </div>
    </Form>
  );
};
