import { createClient } from './client';

export interface AccountPro {
  id: string;
  full_name: string;
  email: string;
  agency_name: string;
  phone: string;
  profile_image_url: string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function signUpPro(data: {
  email: string;
  password: string;
  fullName: string;
  agencyName: string;
  phone: string;
}) {
  const supabase = createClient();

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          account_type: 'pro',
          full_name: data.fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) throw authError;
    if (!authData.user?.id)
      throw new Error('No user ID returned from auth signup');

    // 2. Create pro account record
    const accountData: Omit<AccountPro, 'created_at' | 'updated_at'> = {
      id: authData.user.id,
      full_name: data.fullName,
      email: data.email,
      agency_name: data.agencyName,
      phone: data.phone,
      profile_image_url: null,
      description: null,
    };

    const { error: profileError } = await supabase
      .from('account_pro')
      .insert(accountData);

    if (profileError) {
      console.error('Profile creation error details:', profileError);
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    return { data: authData, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error };
  }
}
