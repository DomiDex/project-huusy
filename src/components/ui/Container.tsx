import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
