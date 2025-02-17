import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ComplianceCheck, ComplianceResult, ComplianceError } from '@/types/compliance'
import { COMPLIANCE_CHECKS } from '@/config/constants'

interface ComplianceState {
  checks: ComplianceCheck[]
  results: ComplianceResult | null
  isLoading: boolean
  error: ComplianceError | null
  currentScan: string | null
  
  // Actions
  setChecks: (checks: ComplianceCheck[]) => void
  updateCheck: (id: string, check: Partial<ComplianceCheck>) => void
  setResults: (results: ComplianceResult) => void
  setLoading: (loading: boolean) => void
  setError: (error: ComplianceError | null) => void
  startScan: (scanId: string) => void
  completeScan: () => void
  resetState: () => void
}

const initialChecks: ComplianceCheck[] = [
  {
    ...COMPLIANCE_CHECKS.MFA,
    status: 'unknown',
    lastChecked: null,
    details: undefined,
  },
  {
    ...COMPLIANCE_CHECKS.RLS,
    status: 'unknown',
    lastChecked: null,
    details: undefined,
  },
  {
    ...COMPLIANCE_CHECKS.PITR,
    status: 'unknown',
    lastChecked: null,
    details: undefined,
  }
]

const initialState = {
  checks: initialChecks,
  results: null,
  isLoading: false,
  error: null,
  currentScan: null,
}

export const useComplianceStore = create<ComplianceState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setChecks: (checks) => 
        set({ checks }),

      updateCheck: (id, checkUpdate) =>
        set((state) => {
          const newState = {
            checks: state.checks.length > 0 
              ? state.checks.map((check) =>
                  check.id === id 
                    ? { 
                        ...check, 
                        ...checkUpdate,
                        lastChecked: new Date().toISOString() 
                      } 
                    : check
                )
              : initialChecks.map((check) =>
                  check.id === id 
                    ? { 
                        ...check, 
                        ...checkUpdate,
                        lastChecked: new Date().toISOString() 
                      } 
                    : check
                )
          };
          console.log('Store Update:', id, newState);
          return newState;
        }),

      setResults: (results) =>
        set({ results }),

      setLoading: (isLoading) =>
        set({ isLoading }),

      setError: (error) =>
        set({ error }),

      startScan: (scanId) =>
        set({ currentScan: scanId, isLoading: true, error: null }),

      completeScan: () =>
        set({ currentScan: null, isLoading: false }),

      resetState: () =>
        set(initialState),
    }),
    {
      name: 'compliance-store',
      // Only persist check results and scan history
      partialize: (state) => ({
        checks: state.checks,
        results: state.results,
      }),
    }
  )
)