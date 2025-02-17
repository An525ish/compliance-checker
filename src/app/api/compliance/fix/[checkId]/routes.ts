import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { checkId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { checkId } = params

    switch (checkId) {
      case 'mfa':
        // Enable MFA for all users
        await supabase.rpc('enable_mfa_all_users')
        break
      case 'rls':
        // Enable RLS for all tables
        await supabase.rpc('enable_rls_all_tables')
        break
      case 'pitr':
        // Enable PITR for all projects
        await supabase.rpc('enable_pitr_all_projects')
        break
      default:
        return NextResponse.json(
          { error: 'Invalid check ID' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}