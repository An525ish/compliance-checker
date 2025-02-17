import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import type { User, Table, Project } from '@/types/compliance'

export function useSupabase() {
  const supabase = createClientComponentClient()

  const checkMFAStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_mfa_status')

      if (error) throw error

      return (data || []).map((user: any) => ({
        id: user.user_id,
        email: user.email,
        hasMFA: user.has_mfa
      })) as User[]
    } catch (error) {
      console.error('MFA check error:', error)
      toast.error('Failed to check MFA status')
      throw error
    }
  }, [supabase])

  const checkRLSStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('check_rls_status')

      if (error) throw error

      return (data || []).map((item: any) => ({
        id: item.table_name,
        name: item.table_name,
        hasRLS: item.has_rls,
        schema: 'public'
      })) as Table[]
    } catch (error) {
      console.error('RLS check error:', error)
      toast.error('Failed to check RLS status')
      throw error
    }
  }, [supabase])

  const checkPITRStatus = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('check_pitr_status')

      if (error) throw error

      return (data || []).map((item: any) => ({
        id: item.project_name,
        name: item.project_name,
        hasPITR: item.has_pitr,
        lastBackup: item.last_backup
      })) as Project[]
    } catch (error) {
      console.error('PITR check error:', error)
      toast.error('Failed to check PITR status')
      throw error
    }
  }, [supabase])

  return {
    supabase,
    checkMFAStatus,
    checkRLSStatus,
    checkPITRStatus
  }
}