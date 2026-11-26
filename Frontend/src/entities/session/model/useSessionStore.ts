import { isAxiosError } from 'axios'
import { create } from 'zustand'
import { getSessionUser } from '../services/session'
import type { SessionUser } from './types'

type SessionState = {
  user: SessionUser | null
  status: 'idle' | 'checking' | 'authenticated' | 'anonymous' | 'error'
  error: string | null
  restoreSession: () => Promise<void>
  setUser: (user: SessionUser) => void
  clearSession: () => void
}

const useSessionStore = create<SessionState>()((set, get) => ({
  user: null,
  status: 'idle',
  error: null,
  restoreSession: async () => {
    if (get().status !== 'idle' && get().status !== 'error') return

    set({ status: 'checking', error: null })

    try {
      const user = await getSessionUser()
      set({ user, status: 'authenticated', error: null })
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        set({ user: null, status: 'anonymous', error: null })
        return
      }

      set({
        user: null,
        status: 'error',
        error: 'Не удалось проверить вход. Проверьте подключение и попробуйте снова.'
      })
    }
  },
  setUser: user => set({ user, status: 'authenticated', error: null }),
  clearSession: () => set({ user: null, status: 'anonymous', error: null })
}))

export default useSessionStore
