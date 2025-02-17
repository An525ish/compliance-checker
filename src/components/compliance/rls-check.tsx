'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { useCompliance } from '@/hooks/use-compliance'
import { useComplianceStore } from '@/store/compliance-store'
import { CheckCard } from './check-card'
import { COMPLIANCE_CHECKS } from '@/config/constants'
import { toast } from 'react-hot-toast'

export function RLSCheck() {
  const [isChecking, setIsChecking] = useState(false)
  const { runCheck, autoFix } = useCompliance()
  const { checks } = useComplianceStore()

  const rlsCheck = checks.find((check) => check.id === 'rls') ?? {
    ...COMPLIANCE_CHECKS.RLS,
    status: 'unknown' as const,
    lastChecked: null,
    details: undefined,
  }

  async function handleCheck() {
    if (isChecking) return;
    setIsChecking(true)
    try {
      await runCheck('rls')
    } finally {
      setIsChecking(false)
    }
  }

  async function handleFix() {
    try {
      await autoFix('rls')
      toast.success('RLS fix applied successfully')
    } catch (error) {
      toast.error('Failed to apply RLS fix')
    }
  }

  return (
    <CheckCard
      title={COMPLIANCE_CHECKS.RLS.name}
      icon={<Lock className="h-5 w-5" />}
      status={rlsCheck.status}
      isChecking={isChecking}
      onCheck={handleCheck}
      onFix={handleFix}
    >
      {rlsCheck.details?.tables && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Database Tables</h4>
            <span className={`text-sm ${rlsCheck.status === 'passing' ? 'text-green-500' : 'text-red-500'}`}>
              {rlsCheck.status === 'passing' ? 'All Tables Protected' : 'Unprotected Tables Found'}
            </span>
          </div>
          <div className="space-y-2">
            {rlsCheck.details.tables.map((table) => (
              <div
                key={table.id}
                className="flex items-center justify-between bg-secondary/50 p-2 rounded-md"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{table.name}</span>
                  <span className="text-xs text-muted-foreground">Schema: {table.schema}</span>
                </div>
                <span className={`text-sm font-medium ${table.hasRLS ? 'text-green-500' : 'text-red-500'}`}>
                  {table.hasRLS ? 'RLS Enabled' : 'RLS Required'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CheckCard>
  )
}