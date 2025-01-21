interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-medium text-primary-950'>{title}</h3>
      {children}
    </div>
  );
}
