import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label
            htmlFor={props.id}
            className='text-foreground text-primary-50 text-md mb-2 block font-medium'
          >
            {label}
          </label>
        )}
        <input
          className={cn(
            'border-primary-800 bg-primary-900/50 placeholder:text-primary-50 w-full rounded-lg border px-4 py-2 placeholder:text-sm',
            'focus:border-primary-800 focus:ring-primary-800 focus:outline-none focus:ring-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
