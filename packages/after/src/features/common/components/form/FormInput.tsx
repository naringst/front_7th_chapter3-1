import React from 'react';
import { Input } from '@/shared/ui/input';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/shared/ui/form';
import { cn } from '@/shared/lib/utils';

// 순수 UI 컴포넌트 - 비즈니스 로직 제거
interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = 'full',
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const widthClasses = {
    small: 'w-[200px]',
    medium: 'w-[300px]',
    large: 'w-[400px]',
    full: 'w-full',
  };

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(widthClasses[width], error && 'border-destructive')}
        />
      </FormControl>
      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
      {helpText && !error && <FormDescription>{helpText}</FormDescription>}
    </FormItem>
  );
};
