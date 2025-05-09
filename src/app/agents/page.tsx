// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client
import Section from '@/components/ui/Section';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AgentCard from '@/features/properties/components/AgentCard';

async function getAgents() {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client
  const { data } = await supabase
    .from('account_pro')
    .select('*')
    .order('full_name');

  return data || [];
}

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <main className='bg-background min-h-screen'>
      <Section className='bg-primary-50 mt-16'>
        <Breadcrumb
          currentPage='Real Estate Agents'
          firstPageName='Home'
          baseUrl='/'
        />
        <h1 className='text-4xl font-medium text-primary-950 mt-4'>
          Our Real Estate Agents
        </h1>
        <p className='text-foreground/80 mt-4 text-lg'>
          Meet our experienced real estate professionals
        </p>
      </Section>

      <Section className='bg-primary-50'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </Section>
    </main>
  );
}
