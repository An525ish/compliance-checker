'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Shield, Settings, Home } from 'lucide-react'

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Compliance',
    href: '/dashboard/compliance',
    icon: Shield,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-semibold">Delve</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-gray-100'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section - Could add version/help info here */}
        <div className="p-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Delve Compliance v1.0
          </p>
        </div>
      </div>
    </div>
  )
}