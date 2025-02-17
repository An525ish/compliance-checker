import { ComplianceOverview } from '@/components/dashboard/overview'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your Supabase configuration compliance status.
        </p>
      </div>
      
      <ComplianceOverview />
    </div>
  )
}