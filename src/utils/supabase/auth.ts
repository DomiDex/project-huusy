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
    // 1. Create auth user, passing all profile data in options.data
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          account_type: 'pro',
          full_name: data.fullName,
          agency_name: data.agencyName,
          phone: data.phone,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) throw authError;
    if (!authData.user?.id)
      throw new Error('No user ID returned from auth signup');

    // Sign up was successful (assuming trigger will handle profile insert)
    return { data: authData, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { data: null, error };
  }
}

export async function signInPro({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  try {
    // 1. Sign in the user
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;
    if (!authData.user) throw new Error('No user returned from auth');

    // 2. Verify the user has a pro account
    const { data: proAccount, error: proError } = await supabase
      .from('account_pro')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (proError) throw new Error('Failed to verify pro account');
    if (!proAccount) throw new Error('No pro account found for this user');

    return {
      data: {
        auth: authData,
        profile: proAccount,
      },
      error: null,
    };
  } catch (error) {
    console.error('Signin error:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred'),
    };
  }
}

export async function signUpCustomer(data: {
  email: string;
  password: string;
  username: string;
}) {
  const supabase = createClient();

  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          account_type: 'customer',
          username: data.username,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) throw authError;
    if (!authData.user?.id)
      throw new Error('No user ID returned from auth signup');

    // 2. Create customer account record
    const accountData = {
      id: authData.user.id,
      username: data.username,
      email: data.email,
      profile_image_url: null,
      account_type: 'customer' as const,
    };

    const { error: profileError } = await supabase
      .from('account_customer')
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

export async function signInCustomer(data: {
  email: string;
  password: string;
}) {
  const supabase = createClient();

  try {
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (signInError) throw signInError;
    if (!authData.user?.id)
      throw new Error('No user ID returned from auth signin');

    // Get the customer account details
    const { data: accountData, error: accountError } = await supabase
      .from('account_customer')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (accountError) throw accountError;
    if (!accountData) throw new Error('No customer account found');

    return { data: { auth: authData, account: accountData }, error: null };
  } catch (error) {
    console.error('Signin error:', error);
    return { data: null, error };
  }
}
