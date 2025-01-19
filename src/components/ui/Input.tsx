'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'dark' | 'light';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, variant = 'light', ...props }, ref) => {
    const inputStyles = cn(
      'w-full rounded-lg border px-4 py-2 text-primary-950 placeholder-primary-400 focus:outline-none focus:ring-2',
      {
        // Light variant (default)
        'border-primary-200 bg-white focus:border-secondary-500 focus:ring-secondary-500/20':
          variant === 'light',
        // Dark variant
        'border-primary-800 bg-primary-900/50 focus:border-secondary-400 focus:ring-secondary-400/20 text-primary-50 placeholder-primary-400':
          variant === 'dark',
      },
      className
    );

    const labelStyles = cn('block text-sm font-medium mb-2', {
      'text-primary-950': variant === 'light',
      'text-primary-50': variant === 'dark',
    });

    return (
      <div className='w-full'>
        {label && <label className={labelStyles}>{label}</label>}
        <input ref={ref} className={inputStyles} {...props} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
