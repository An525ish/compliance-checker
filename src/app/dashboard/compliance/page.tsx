import { ComplianceOverview } from '@/components/dashboard/overview'
import { MFACheck } from '@/components/compliance/mfa-check'
import { RLSCheck } from '@/components/compliance/rls-check'
import { PITRCheck } from '@/components/compliance/pitr-check'

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <ComplianceOverview />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MFACheck />
        <RLSCheck />
        <PITRCheck />
      </div>
    </div>
  )
}