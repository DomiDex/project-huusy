import { MetadataRoute } from 'next';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server'; // Import the new server client

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const supabase = createServerComponentClient({ cookies });
  const supabase = await createClient(); // Use the async server client

  // Fetch dynamic data
  const { data: properties } = await supabase
    .from('properties')
    .select('path')
    .not('path', 'is', null);

  const { data: cities } = await supabase
    .from('cities')
    .select('path')
    .not('path', 'is', null);

  const { data: propertyTypes } = await supabase
    .from('property_types')
    .select('path')
    .not('path', 'is', null);

  const { data: saleTypes } = await supabase
    .from('sale_types')
    .select('path')
    .not('path', 'is', null);

  const { data: agents } = await supabase.from('account_pro').select('id');

  // Base URL from environment variable or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://huusy.com';

  // Static routes based on the routes config
  const staticRoutes = [
    '',
    '/properties',
    '/properties/cities',
    '/properties/sale',
    '/properties/property-type',
    '/agents',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes for properties
  const propertyRoutes = (properties || []).map((property) => ({
    url: `${baseUrl}/properties/${property.path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic routes for cities
  const cityRoutes = (cities || []).map((city) => ({
    url: `${baseUrl}/properties/cities/${city.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic routes for property types
  const propertyTypeRoutes = (propertyTypes || []).map((type) => ({
    url: `${baseUrl}/properties/property-type/${type.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic routes for sale types
  const saleTypeRoutes = (saleTypes || []).map((type) => ({
    url: `${baseUrl}/properties/sale/${type.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic routes for agents
  const agentRoutes = (agents || []).map((agent) => ({
    url: `${baseUrl}/agents/${agent.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Combine all routes
  return [
    ...staticRoutes,
    ...propertyRoutes,
    ...cityRoutes,
    ...propertyTypeRoutes,
    ...saleTypeRoutes,
    ...agentRoutes,
  ];
}
