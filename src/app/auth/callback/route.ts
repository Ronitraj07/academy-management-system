import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Get the user's role and redirect accordingly
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      const role = profile?.role;
      if (role === 'admin') return NextResponse.redirect(`${origin}/dashboard/admin`);
      if (role === 'faculty') return NextResponse.redirect(`${origin}/dashboard/faculty`);
      if (role === 'student') return NextResponse.redirect(`${origin}/dashboard/student`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/pending`);
}
