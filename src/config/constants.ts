export const COMPLIANCE_CHECKS = {
    MFA: {
      id: 'mfa',
      name: 'Multi-Factor Authentication',
      description: 'Ensures all users have MFA enabled for their accounts',
      category: 'security',
      impact: 'high',
      autoFixAvailable: true,
    },
    RLS: {
      id: 'rls',
      name: 'Row Level Security',
      description: 'Verifies RLS is enabled on all database tables',
      category: 'security',
      impact: 'high',
      autoFixAvailable: true,
    },
    PITR: {
      id: 'pitr',
      name: 'Point in Time Recovery',
      description: 'Checks if PITR backups are enabled for all projects',
      category: 'backup',
      impact: 'medium',
      autoFixAvailable: true,
    },
  } as const
  
  export const API_ENDPOINTS = {
    MFA_CHECK: '/api/compliance/mfa',
    RLS_CHECK: '/api/compliance/rls',
    PITR_CHECK: '/api/compliance/pitr',
    AUTO_FIX: '/api/compliance/fix',
  } as const
  
  export const NAVIGATION = {
    DASHBOARD: [
      {
        name: 'Overview',
        href: '/dashboard',
        icon: 'Home',
      },
      {
        name: 'Compliance',
        href: '/dashboard/compliance',
        icon: 'Shield',
      },
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: 'Settings',
      },
    ],
  } as const