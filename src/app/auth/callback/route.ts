import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    
    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError);
      return NextResponse.redirect(`${origin}/sign-in?error=Could not authenticate user`);
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Error getting user:', userError);
      return NextResponse.redirect(`${origin}/sign-in?error=Could not authenticate user`);
    }

    // Check if user is a pro or customer
    const accountType = user.user_metadata?.account_type;
    
    if (accountType === 'pro') {
      // Check if pro account exists
      const { data: proAccount, error: proError } = await supabase
        .from('account_pro')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (proError || !proAccount) {
        console.error('Pro account not found:', proError);
        return NextResponse.redirect(`${origin}/pro/sign-in?error=Account not found`);
      }
      
      // Redirect to pro dashboard
      return NextResponse.redirect(`${origin}/pro/${user.id}`);
    } else if (accountType === 'customer') {
      // Check if customer account exists
      const { data: customerAccount, error: customerError } = await supabase
        .from('account_customer')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (customerError || !customerAccount) {
        console.error('Customer account not found:', customerError);
        return NextResponse.redirect(`${origin}/customer/register?error=Account not found`);
      }
      
      // Redirect to customer dashboard
      return NextResponse.redirect(`${origin}/customer/${user.id}`);
    } else {
      // Unknown account type
      console.error('Unknown account type:', accountType);
      return NextResponse.redirect(`${origin}/?error=Unknown account type`);
    }
  }

  // No code provided
  return NextResponse.redirect(`${origin}/?error=No code provided`);
}