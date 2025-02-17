'use client'

import { useState } from 'react'
import { User } from '@supabase/auth-helpers-nextjs'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'react-hot-toast'
import { useSupabase } from '@/hooks/use-supabase'

interface SettingsFormProps {
  user: User | undefined
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoFixEnabled, setAutoFixEnabled] = useState(false)
  const { supabase } = useSupabase()

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      toast.success('Password updated successfully')
      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateSettings = async () => {
    setIsLoading(true)
    try {
      // Save user preferences to profile
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          notifications_enabled: notificationsEnabled,
          auto_fix_enabled: autoFixEnabled
        })

      if (error) throw error

      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Update your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input 
              value={user.email} 
              disabled 
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about compliance status changes
                </p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Fix Issues</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically attempt to fix compliance issues when possible
                </p>
              </div>
              <Switch
                checked={autoFixEnabled}
                onCheckedChange={setAutoFixEnabled}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpdateSettings}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to maintain account security
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleUpdatePassword}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="max-w-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="max-w-md"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              Update Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}