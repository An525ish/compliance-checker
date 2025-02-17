'use client'

import { useState } from 'react'
import { Database } from 'lucide-react'
import { useSupabase } from '@/hooks/use-supabase'
import { useComplianceStore } from '@/store/compliance-store'
import { CheckCard } from './check-card'
import { COMPLIANCE_CHECKS } from '@/config/constants'
import { toast } from 'react-hot-toast'
import { formatDate } from '@/lib/utils'
import { Project } from '@/types/compliance'

export function PITRCheck() {
  const [isChecking, setIsChecking] = useState(false)
  const { checkPITRStatus } = useSupabase()
  const { updateCheck, checks } = useComplianceStore()

  const pitrCheck = checks.find((check) => check.id === 'pitr') ?? {
    ...COMPLIANCE_CHECKS.PITR,
    status: 'unknown' as const,
    lastChecked: null,
    details: undefined,
  }

  async function runCheck() {
    setIsChecking(true)
    try {
      const projects = await checkPITRStatus()
      const allEnabled = projects.every((project: Project) => project.hasPITR)
      
      updateCheck('pitr', {
        status: allEnabled ? 'passing' : 'failing',
        lastChecked: new Date().toISOString(),
        details: {
          projects,
          lastUpdated: new Date().toISOString()
        }
      })
    } catch (error) {
      toast.error('Failed to check PITR status')
      updateCheck('pitr', {
        status: 'failing',
        lastChecked: new Date().toISOString(),
        details: {
          errorMessage: 'Failed to check PITR status',
          lastUpdated: new Date().toISOString()
        }
      })
    } finally {
      setIsChecking(false)
    }
  }

  async function handleFix() {
    try {
      const response = await fetch('/api/compliance/fix/pitr', {
        method: 'POST'
      })
      
      if (!response.ok) {
        throw new Error('Failed to apply fix')
      }

      toast.success('Fix applied successfully')
      await runCheck()
    } catch (error) {
      toast.error('Failed to apply fix')
    }
  }

  return (
    <CheckCard
      title={COMPLIANCE_CHECKS.PITR.name}
      icon={<Database className="h-5 w-5" />}
      status={pitrCheck.status}
      isChecking={isChecking}
      onCheck={runCheck}
      onFix={handleFix}
    >
      {pitrCheck.details?.projects && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">Project Status</h4>
          <div className="mt-2 space-y-2">
            {pitrCheck.details.projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex flex-col">
                  <span className="truncate max-w-[200px]">{project.name}</span>
                  {project.lastBackup && (
                    <span className="text-xs text-muted-foreground">
                      Last backup: {formatDate(project.lastBackup)}
                    </span>
                  )}
                </div>
                <span className={project.hasPITR ? 'text-green-500' : 'text-red-500'}>
                  {project.hasPITR ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CheckCard>
  )
}