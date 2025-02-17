import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { checkId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Check authentication
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { checkId } = params
    const functionName = 
      checkId === 'mfa' ? 'enable_mfa_all_users' :
      checkId === 'rls' ? 'enable_rls_all_tables' :
      checkId === 'pitr' ? 'enable_pitr_all_projects' :
      null;

    if (!functionName) {
      return NextResponse.json(
        { error: 'Invalid check ID' },
        { status: 400 }
      )
    }

    // Call the fix function
    const { data, error } = await supabase.rpc(functionName)

    if (error) {
      console.error(`Fix error for ${checkId}:`, error)
      return NextResponse.json(
        { error: `Failed to apply ${checkId.toUpperCase()} fix: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(data || { 
      success: true,
      message: `${checkId.toUpperCase()} fix applied successfully`
    })
  } catch (error) {
    console.error('Fix error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 