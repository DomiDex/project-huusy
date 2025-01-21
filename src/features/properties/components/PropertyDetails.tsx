import { BedroomIcon, BathroomIcon } from '@/components/icons';

interface PropertyDetailsProps {
  bedrooms: number;
  bathrooms: number;
  size: number;
}

export default function PropertyDetails({
  bedrooms,
  bathrooms,
  size,
}: PropertyDetailsProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-2'>
        <BedroomIcon />
        <span className='text-sm text-primary-800'>{bedrooms} bed</span>
      </div>
      <div className='flex items-center gap-2'>
        <BathroomIcon />
        <span className='text-sm text-primary-800'>{bathrooms} bath</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-primary-800'>{size} m²</span>
      </div>
    </div>
  );
}
