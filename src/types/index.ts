// Existing account types
export type AccountPro = {
  id: string;
  full_name: string;
  email: string;
  agency_name: string;
  phone: string;
  profile_image_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

export type AccountCustomer = {
  id: string;
  username: string;
  email: string;
  profile_image_url?: string;
  account_type: 'customer';
  created_at: string;
  updated_at: string;
};

// Property related types
export interface PropertyType {
  id: string;
  title: string;
  path: string;
  og_image_url: string;
  created_at: string;
  updated_at: string;
}

export type City = {
  id: string;
  title: string;
  path: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  created_at: string;
  updated_at: string;
};

export type SaleType = {
  id: string;
  title: string;
  path: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  created_at: string;
  updated_at: string;
};

export interface Property {
  id: string;
  path: string;
  property_name: string;
  price: number;
  excerpt: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  property_size: number;
  property_type: {
    id: string;
    title: string;
  };
  city: {
    id: string;
    title: string;
  };
  sale_type: {
    id: string;
    title: string;
  };
  agent: {
    id: string;
    full_name: string;
    agency_name: string;
    phone: string;
    profile_image_url: string | null;
  } | null;
}

export type Favorite = {
  id: string;
  property_id: string;
  customer_id: string;

  // Relations
  property?: Property;
  customer?: AccountCustomer;

  created_at: string;
};

// Database helper types for better type inference
export type Tables = {
  properties: Property;
  property_types: PropertyType;
  cities: City;
  sale_types: SaleType;
  favorites: Favorite;
  account_pro: AccountPro;
  account_customer: AccountCustomer;
};
