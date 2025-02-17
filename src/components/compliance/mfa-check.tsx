'use client'

import { COMPLIANCE_CHECKS } from '@/config/constants'
import { useCompliance } from '@/hooks/use-compliance'
import { useComplianceStore } from '@/store/compliance-store'
import { Shield } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { CheckCard } from './check-card'

export function MFACheck() {
  const [isChecking, setIsChecking] = useState(false)
  const { runCheck, autoFix } = useCompliance()
  const { checks } = useComplianceStore()

  const mfaCheck = checks.find((check) => check.id === 'mfa') ?? {
    ...COMPLIANCE_CHECKS.MFA,
    status: 'unknown' as const,
    lastChecked: null,
    details: undefined,
  }

  async function handleCheck() {
    if (isChecking) return;
    setIsChecking(true)
    try {
      await runCheck('mfa')
    } finally {
      setIsChecking(false)
    }
  }

  async function handleFix() {
    try {
      await autoFix('mfa')
      toast.success('MFA fix applied successfully')
    } catch (error) {
      toast.error('Failed to apply MFA fix')
    }
  }

  return (
    <CheckCard
      title={COMPLIANCE_CHECKS.MFA.name}
      icon={<Shield className="h-5 w-5" />}
      status={mfaCheck.status}
      isChecking={isChecking}
      onCheck={handleCheck}
      onFix={handleFix}
    >
      {mfaCheck.details?.users && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">User Status</h4>
            <span className={`text-sm ${mfaCheck.status === 'passing' ? 'text-green-500' : 'text-red-500'}`}>
              {mfaCheck.status === 'passing' ? 'All Users Protected' : 'Users Without MFA'}
            </span>
          </div>
          <div className="space-y-2">
            {mfaCheck.details.users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-secondary/50 p-2 rounded-md"
              >
                <span className="text-sm truncate max-w-[200px]">{user.email}</span>
                <span className={`text-sm font-medium ${user.hasMFA ? 'text-green-500' : 'text-red-500'}`}>
                  {user.hasMFA ? 'MFA Enabled' : 'MFA Required'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CheckCard>
  )
}