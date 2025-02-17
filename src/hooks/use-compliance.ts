import { useComplianceStore } from '@/store/compliance-store'
import type { Project, Table, ComplianceStatus } from '@/types/compliance'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSupabase } from './use-supabase'

export function useCompliance() {
  const [isScanning, setIsScanning] = useState(false)
  const { checkMFAStatus, checkRLSStatus, checkPITRStatus } = useSupabase()
  const { updateCheck } = useComplianceStore()

  const runCheck = useCallback(async (checkId: string) => {
    setIsScanning(true)
    try {
      switch (checkId) {
        case 'mfa':
          const users = await checkMFAStatus()
          console.log('MFA Check Results:', users)
          const mfaPassing = users.every((user) => user.hasMFA)
          const mfaUpdate = {
            status: (mfaPassing ? 'passing' : 'failing') as ComplianceStatus,
            lastChecked: new Date().toISOString(),
            details: { 
              users,
              lastUpdated: new Date().toISOString()
            }
          };
          console.log('MFA Update:', mfaUpdate);
          updateCheck('mfa', mfaUpdate);
          break;

        case 'rls':
          const tables = await checkRLSStatus()
          const rlsPassing = tables.every((table: Table) => table.hasRLS)
          updateCheck('rls', {
            status: (rlsPassing ? 'passing' : 'failing') as ComplianceStatus,
            lastChecked: new Date().toISOString(),
            details: { 
              tables,
              lastUpdated: new Date().toISOString()
            }
          })
          break;

        case 'pitr':
          const projects = await checkPITRStatus()
          const pitrPassing = projects.every((project: Project) => project.hasPITR)
          updateCheck('pitr', {
            status: (pitrPassing ? 'passing' : 'failing') as ComplianceStatus,
            lastChecked: new Date().toISOString(),
            details: { 
              projects,
              lastUpdated: new Date().toISOString()
            }
          })
          break;
      }
    } catch (error) {
      console.error(`Failed to run ${checkId} check:`, error)
      updateCheck(checkId, {
        status: 'failing',
        lastChecked: new Date().toISOString(),
        details: { errorMessage: 'Check failed' }
      })
    } finally {
      setIsScanning(false)
    }
  }, [checkMFAStatus, checkRLSStatus, checkPITRStatus, updateCheck])

  const autoFix = useCallback(async (checkId: string) => {
    try {
      const result = await fetch(`/api/compliance/fix/${checkId}`, {
        method: 'POST'
      })
      
      if (!result.ok) {
        throw new Error('Failed to apply fix')
      }

      toast.success('Fix applied successfully')
      // Re-run the specific check
      await runCheck(checkId)
    } catch (error) {
      toast.error('Failed to apply fix')
      throw error
    }
  }, [runCheck])

  return {
    isScanning,
    runCheck,
    autoFix
  }
}