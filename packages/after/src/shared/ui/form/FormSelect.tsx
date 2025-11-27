import React from 'react';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/shared/ui/form';
import { cn } from '@/shared/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
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
        <select
          name={name}
          value={value || ''}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={cn(
            'flex h-9 w-full rounded-md border px-3 py-1 text-sm transition-[color,box-shadow] outline-none',
            'border-[var(--color-semantic-line-solid-normal)]',
            'bg-[var(--color-semantic-background-normal-normal)]',
            'text-[var(--color-semantic-label-normal)]',
            'focus-visible:border-[var(--color-semantic-primary-normal)]',
            'focus-visible:ring-[var(--color-semantic-primary-normal)]/50 focus-visible:ring-[3px]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'disabled:bg-[var(--color-semantic-interaction-disable)]',
            'aria-invalid:border-[var(--color-semantic-status-negative)]',
            'aria-invalid:ring-[var(--color-semantic-status-negative)]/20',
            error && 'border-[var(--color-semantic-status-negative)]',
            className,
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormControl>
      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
      {helpText && !error && <FormDescription>{helpText}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
