'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AccountPro } from '@/types';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

interface AgentCardProps {
  agent: AccountPro;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className='block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'
    >
      <div className='p-6'>
        <div className='flex items-center gap-4'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden'>
            <Image
              src={agent.profile_image_url || '/default-avatar.png'}
              alt={agent.full_name}
              fill
              className='object-cover'
            />
          </div>
          <div>
            <h2 className='text-xl font-medium text-primary-950'>
              {agent.full_name}
            </h2>
            <p className='text-primary-800'>{agent.agency_name}</p>
          </div>
        </div>
        {agent.description && (
          <p className='mt-4 text-foreground/80 line-clamp-3'>
            {agent.description}
          </p>
        )}
        <div className='mt-6'>
          <WhatsAppButton
            phoneNumber={agent.phone}
            className='w-full justify-center'
          />
        </div>
      </div>
    </Link>
  );
}
