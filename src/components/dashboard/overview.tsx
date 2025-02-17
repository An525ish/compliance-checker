'use client'

import { useComplianceStore } from '@/store/compliance-store'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Shield, Lock, Database } from 'lucide-react'

export function ComplianceOverview() {
  const { checks } = useComplianceStore()
  
  const totalChecks = checks.length
  const passingChecks = checks.filter(
    (check) => check.status === 'passing'
  ).length

  const complianceScore = totalChecks > 0 
    ? Math.round((passingChecks / totalChecks) * 100) 
    : 0

  const lastChecked = checks.length > 0
    ? new Date(Math.max(...checks
        .filter(check => check.lastChecked)
        .map(check => new Date(check.lastChecked!).getTime())))
    : null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Compliance Score
          </CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {complianceScore}%
          </div>
          <p className="text-xs text-muted-foreground">
            {passingChecks} of {totalChecks} checks passing
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            MFA Status
          </CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {checks.find(c => c.id === 'mfa')?.status === 'passing' ? 'Enabled' : 'Check Required'}
          </div>
          <p className="text-xs text-muted-foreground">
            Multi-Factor Authentication
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            RLS Status
          </CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {checks.find(c => c.id === 'rls')?.status === 'passing' ? 'Enabled' : 'Check Required'}
          </div>
          <p className="text-xs text-muted-foreground">
            Row Level Security
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            PITR Status
          </CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {checks.find(c => c.id === 'pitr')?.status === 'passing' ? 'Enabled' : 'Check Required'}
          </div>
          <p className="text-xs text-muted-foreground">
            Point in Time Recovery
          </p>
        </CardContent>
      </Card>
    </div>
  )
}