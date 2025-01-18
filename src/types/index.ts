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
