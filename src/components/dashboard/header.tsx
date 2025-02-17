'use client'

import { User } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User as UserIcon, LogOut, Settings } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface HeaderProps {
  user: User
}

export function DashboardHeader({ user }: HeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Signed out successfully')
      router.refresh()
      router.push('/login')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  return (
    <header className="fixed right-0 left-64 h-16 bg-white border-b z-30">
      <div className="h-full px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Compliance Dashboard</h1>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user.email}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
              >
                <UserIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}