import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import Container from './Container';

type SectionProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Section<T extends ElementType = 'section'>({
  as,
  children,
  className,
  containerClassName,
  ...props
}: SectionProps<T>) {
  const Component = as || 'section';

  return (
    <Component className={cn('py-4 sm:py-8 lg:py-8', className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
