import { ReactNode } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { ComplianceStatus } from '@/types/compliance'
import { cn } from '@/lib/utils'

interface CheckCardProps {
  title: string
  icon: ReactNode
  status: ComplianceStatus
  isChecking: boolean
  onCheck: () => Promise<void>
  onFix?: () => Promise<void>
  children: ReactNode
  className?: string
}

export function CheckCard({
  title,
  icon,
  status,
  isChecking,
  onCheck,
  onFix,
  children,
  className
}: CheckCardProps) {
  return (
    <Card className={cn("relative", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {status === 'passing' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : status === 'failing' ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <div className="h-5 w-5" />
            )}
            <span className="text-sm">
              {status === 'passing' ? 'Check passing' : 
               status === 'failing' ? 'Check failing' : 
               'Not checked'}
            </span>
          </div>
          {children}
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button 
          onClick={onCheck} 
          disabled={isChecking}
          className="flex-1"
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Run Check'
          )}
        </Button>
        {status === 'failing' && onFix && (
          <Button 
            onClick={onFix}
            variant="secondary"
            disabled={isChecking}
          >
            Auto Fix
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}